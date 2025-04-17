import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { AppProvider } from '@context/AppContext';
import NotificationBar from '@components/NotificationBar';
import { theme } from '@theme/theme';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar backgroundColor={theme.colors.primary} />
        <NotificationBar />
        <Slot /> 
      </AppProvider>
    </SafeAreaProvider>
  );
}
