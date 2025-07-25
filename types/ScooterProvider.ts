import type { Scooter } from '~/types/Scooter';
import { MapboxDirections } from './Directions';

export type ScooterContextType = {
  selectedScooter?: Scooter;
  setSelectedScooter: (scooter: Scooter) => void;
  direction?: MapboxDirections;
  directionCoordinate?: number[][];
  duration?: number;
  distance?: number;
  isNearby?: boolean;
  nearbyScooters: Scooter[];
};
