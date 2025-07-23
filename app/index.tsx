import { Stack } from 'expo-router';
import Map from '~/components/Map';
import ScooterProvider from '~/providers/ScooterProvider';

export default function Home() {
  return (
    <ScooterProvider>
      <Stack.Screen options={{ title: 'Home' }} />
      <Map />
    </ScooterProvider>
  );
}
