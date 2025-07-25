import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { supabase } from '~/lib/supabase';
import { useAuth } from './AuthProvider';
import { useScooter } from './ScooterProvider';
import { Alert } from 'react-native';
import { Ride } from '~/types/Ride';
import * as Location from 'expo-location';
import { fetchDirectionBasedOnCoords } from '~/service/direction';

type RideContextType = {
  ride: Ride | null;
  rideRoute: number[][];
  startRide: (scooterId: number) => Promise<void>;
  finishRide: () => Promise<void>;
};

const RideContext = createContext<RideContextType | undefined>(undefined);

export default function RideProvider({ children }: PropsWithChildren) {
  const [ride, setRide] = useState<Ride | null>(null);
  const [rideRoute, setRideRoute] = useState<[number, number][]>([]);
  const { user_id } = useAuth();

  useEffect(() => {
    const fetchActiveRide = async () => {
      const { data } = await supabase
        .from('rides')
        .select('*')
        .eq('user_id', user_id)
        .is('finished_at', null)
        .limit(1)
        .single();

      if (data) {
        setRide(data);
      }
    };

    fetchActiveRide();
  }, []);

  useEffect(() => {
    let subscription: Location.LocationSubscription | undefined;

    const startWatchingPosition = async () => {
      try {
        subscription = await Location.watchPositionAsync(
          { distanceInterval: 30 },
          (newLocation) => {
            console.log(
              'New location: ',
              newLocation.coords.longitude,
              newLocation.coords.latitude
            );
            // 경로에 위치 추가
            setRideRoute((currrRoute) => [
              ...currrRoute,
              [newLocation.coords.longitude, newLocation.coords.latitude],
            ]);
          }
        );
      } catch (error) {
        console.error('❌ Failed to start location tracking:', error);
      }
    };

    if (ride) {
      startWatchingPosition();
    }

    return () => {
      subscription?.remove();
    };
  }, [ride]);

  const startRide = async (scooterId: number) => {
    if (ride) {
      Alert.alert('이미 진행 중인 라이딩이 있습니다.');
      return;
    }
    const { data, error } = await supabase
      .from('rides')
      .insert([
        {
          user_id,
          scooter_id: scooterId,
        },
      ])
      .select();
    if (error) {
      console.error('Failed to start journey:', error);
    } else {
      setRide(data[0]);
    }
  };

  const finishRide = async () => {
    if (!ride) {
      Alert.alert('진행 중인 라이딩이 없습니다.');
      return;
    }

    const actualRoute = await fetchDirectionBasedOnCoords(rideRoute);
    const rideRouteCoords = actualRoute.matchings[0].geometry.coordinates;
    const rideRouteDuration = actualRoute.matchings[0].duration;
    const rideRouteDistance = actualRoute.matchings[0].distance;
    setRideRoute(rideRouteCoords);
    const { error } = await supabase
      .from('rides')
      .update({
        finished_at: new Date(),
        routeDuration: rideRouteDuration,
        routeDistance: rideRouteDistance,
        routeCoords: rideRouteCoords,
      })
      .eq('id', ride.id);

    if (error) {
      console.error('Failed to finish ride:', error);
    } else {
      setRide(null);
    }
  };

  return (
    <RideContext.Provider value={{ startRide, ride, rideRoute, finishRide }}>
      {children}
    </RideContext.Provider>
  );
}

export const useRide = (): RideContextType => {
  const context = useContext(RideContext);
  if (!context) {
    throw new Error('useRide must be used within a <RideProvider>');
  }
  return context;
};
