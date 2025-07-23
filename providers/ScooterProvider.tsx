import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { getDirections } from '~/service/direction';
import * as Location from 'expo-location';

type Scooter = {
  id: number;
  lat: number;
  long: number;
};

export interface MapboxDirections {
  code: string;
  uuid: string;
  waypoints: {
    distance: number;
    name: string;
    location: [number, number];
  }[];
  routes: {
    distance: number;
    duration: number;
    geometry: {
      coordinates: [number, number][];
      type: string;
    };
    legs: {
      via_waypoints: [];
      admins: {
        iso_3166_1: string;
        iso_3166_1_alpha3: string;
      }[];
      distance: number;
      duration: number;
      steps: [];
      summary: string;
      weight: number;
    }[];
    weight: number;
    weight_name: string;
  }[];
}

type ScooterContextType = {
  selectedScooter?: Scooter;
  setSelectedScooter: (scooter: Scooter) => void;
  direction?: MapboxDirections;
  directionCoordinate?: number[][];
  routeTime?: number;
  routeDistance?: number;
};

const scooterContext = createContext<ScooterContextType | undefined>(undefined);

export default function ScooterProvider({ children }: PropsWithChildren) {
  const [selectedScooter, setSelectedScooter] = useState<Scooter>();
  const [direction, setDirection] = useState<MapboxDirections>();

  useEffect(() => {
    const fetchDirections = async () => {
      if (!selectedScooter) return;
      const currentLocation = await Location.getCurrentPositionAsync();
      const newDirection = await getDirections(
        [currentLocation.coords.longitude, currentLocation.coords.latitude],
        [selectedScooter.long, selectedScooter.lat]
      );
      console.log('Direction:', newDirection);
      setDirection(newDirection);
    };

    fetchDirections();
  }, [selectedScooter]);

  console.log('ScooterProvider initialized with selectedScooter:', selectedScooter);
  return (
    <scooterContext.Provider
      value={{
        selectedScooter,
        setSelectedScooter,
        direction,
        directionCoordinate: direction?.routes?.[0].geometry.coordinates,
        routeTime: direction?.routes?.[0].duration,
        routeDistance: direction?.routes?.[0].distance,
      }}>
      {children}
    </scooterContext.Provider>
  );
}

export const useScooter = () => {
  const context = useContext(scooterContext);
  if (!context) {
    throw new Error('useScooter must be used within a <ScooterProvider>');
  }
  return context;
};
