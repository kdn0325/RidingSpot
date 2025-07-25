import { Stack } from 'expo-router';
import ActiveRideSheet from '~/components/ActiveRideSheet';
import { Button } from '~/components/Button';
import Map from '~/components/Map';
import SelectedScooterSheet from '~/components/SelectedScooterSheet';
import { supabase } from '~/lib/supabase';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <Map />
      <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      <SelectedScooterSheet />
      <ActiveRideSheet />
    </>
  );
}
