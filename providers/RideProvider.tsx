import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { supabase } from '~/lib/supabase';
import { useAuth } from './AuthProvider';
import { useScooter } from './ScooterProvider';
import { Alert } from 'react-native';
import { Ride } from '~/types/Ride';

type RideContextType = {
  ride: Ride | null;
  startRide: (scooterId: number) => Promise<void>;
  finishRide: () => Promise<void>;
};

const RideContext = createContext<RideContextType | undefined>(undefined);

export default function RideProvider({ children }: PropsWithChildren) {
  const [ride, setRide] = useState<Ride | null>(null);

  const { selectedScooter } = useScooter();
  const { user_id } = useAuth();

  useEffect(() => {
    const fetchActiveRide = async () => {
      const { data, error } = await supabase
        .from('rides')
        .select('*')
        .eq('user_id', user_id)
        .is('finished_at', null)
        .limit(1)
        .single();

      console.log('fetchActiveRide:', data, error);
      if (data) {
        setRide(data);
      }
    };

    fetchActiveRide();
  }, [selectedScooter, user_id]);

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
      .select()
      .single();
    if (error) {
      console.error('Failed to start journey:', error);
    } else {
      setRide(data);
    }
  };

  const finishRide = async () => {
    if (!ride) {
      Alert.alert('진행 중인 라이딩이 없습니다.');
      return;
    }
    const { data, error } = await supabase
      .from('rides')
      .update({ finished_at: new Date() })
      .eq('id', ride.id);
    console.log('finishRide:', data);

    if (error) {
      console.error('Failed to finish ride:', error);
    } else {
      setRide(null);
    }
  };

  return (
    <RideContext.Provider value={{ startRide, ride, finishRide }}>{children}</RideContext.Provider>
  );
}

export const useRide = (): RideContextType => {
  const context = useContext(RideContext);
  if (!context) {
    throw new Error('useRide must be used within a <RideProvider>');
  }
  return context;
};
