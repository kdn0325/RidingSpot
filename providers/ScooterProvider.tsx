import { createContext, PropsWithChildren, use, useContext, useEffect, useState } from 'react';
import { getDirections } from '~/service/direction';
import * as Location from 'expo-location';
import distance from '@turf/distance';
import { point } from '@turf/helpers';
import { ScooterContextType } from '~/types/ScooterProvider';
import { MapboxDirections } from '~/types/Directions';
import { Scooter } from '~/types/Scooter';
import { supabase } from '~/lib/supabase';
import { Alert } from 'react-native';

const scooterContext = createContext<ScooterContextType | undefined>(undefined);

export default function ScooterProvider({ children }: PropsWithChildren) {
  const [nearbyScooters, setNearbyScooters] = useState<Scooter[]>([]);
  const [selectedScooter, setSelectedScooter] = useState<Scooter>();
  const [direction, setDirection] = useState<MapboxDirections>();
  const [isNearby, setIsNearby] = useState(false);

  useEffect(() => {
    const fetchScooters = async () => {
      const location = await Location.getCurrentPositionAsync();
      const { error, data } = await supabase.rpc('nearby_scooters', {
        lat: location.coords.latitude,
        long: location.coords.longitude,
        // 1km 이내의 스쿠터를 가져옴
        max_dist_meters: 1000,
      });
      if (error) {
        Alert.alert('Failed to fetch scooters');
      } else {
        setNearbyScooters(data);
      }
    };

    fetchScooters();
  }, []);

  useEffect(() => {
    const subscription = Location.watchPositionAsync({ distanceInterval: 10 }, (newLocation) => {
      if (selectedScooter) {
        const from = point([newLocation.coords.longitude, newLocation.coords.latitude]);
        const to = point([selectedScooter.long, selectedScooter.lat]);
        const calculatedDistance = distance(from, to, { units: 'meters' });
        // 500m 이내에 있으면 활성화
        if (calculatedDistance < 500) {
          setIsNearby(true);
        }
      }
    });
    return () => {
      subscription.then((sub) => sub.remove());
    };
  }, [selectedScooter]);

  useEffect(() => {
    // 선택된 스쿠터가 변경되면 방향을 가져옵니다.
    const fetchDirections = async () => {
      if (!selectedScooter) return;
      const currentLocation = await Location.getCurrentPositionAsync();
      const newDirection = await getDirections(
        [currentLocation.coords.longitude, currentLocation.coords.latitude],
        [selectedScooter.long, selectedScooter.lat]
      );

      setDirection(newDirection);
    };

    if (selectedScooter) {
      fetchDirections();
      setIsNearby(false); // 스쿠터 선택 시 근처 여부 초기화
    } else {
      setDirection(undefined);
      setIsNearby(false);
    }
  }, [selectedScooter]);

  return (
    <scooterContext.Provider
      value={{
        selectedScooter,
        setSelectedScooter,
        direction,
        directionCoordinate: direction?.routes?.[0].geometry.coordinates,
        duration: direction?.routes?.[0].duration,
        distance: direction?.routes?.[0].distance,
        isNearby,
        nearbyScooters,
      }}>
      {children}
    </scooterContext.Provider>
  );
}

export const useScooter = (): ScooterContextType => {
  const context = useContext(scooterContext);
  if (!context) {
    throw new Error('useScooter must be used within a <ScooterProvider>');
  }
  return context;
};
