import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import ScooterProvider from '~/providers/ScooterProvider';
import AuthProvider from '~/providers/AuthProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ScooterProvider>
          <Stack screenOptions={{ headerShown: false }} />
          <StatusBar barStyle={'light-content'} />
        </ScooterProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
