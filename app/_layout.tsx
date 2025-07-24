import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import ScooterProvider from '~/providers/ScooterProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScooterProvider>
        <Stack />
        <StatusBar barStyle={'light-content'} />
      </ScooterProvider>
    </GestureHandlerRootView>
  );
}
