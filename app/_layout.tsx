import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import ScooterProvider from '~/providers/ScooterProvider';
import AuthProvider from '~/providers/AuthProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RideProvider from '~/providers/RideProvider';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ScooterProvider>
          <RideProvider>
            <Stack screenOptions={{ headerShown: false }} />
            <StatusBar barStyle={'light-content'} />
          </RideProvider>
        </ScooterProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
