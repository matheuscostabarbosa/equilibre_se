import { Tabs } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '@theme/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTitleAlign: 'center',
        headerTintColor: theme.colors.white,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          borderTopWidth: 1,
          borderTopColor: '#eee',
          height: 60,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontFamily: theme.typography.fontFamily,
          fontSize: 12,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = '';

          if (route.name === 'diary') {
            iconName = focused ? 'journal' : 'journal-outline';
          } else if (route.name === 'habits') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'relax') {
            iconName = focused ? 'leaf' : 'leaf-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="diary" options={{ title: 'Diário Emocional' }} />
      <Tabs.Screen name="habits" options={{ title: 'Hábitos Saudáveis' }} />
      <Tabs.Screen name="relax" options={{ title: 'Atividades Relaxantes' }} />
    </Tabs>
  );
}
