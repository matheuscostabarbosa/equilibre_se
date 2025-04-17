import { useEffect } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { SchedulableTriggerInputTypes } from 'expo-notifications';
import { useAppContext } from '@context/AppContext';

export const useNotifications = () => {
  const { showNotification } = useAppContext();

  useEffect(() => {
    registerForPushNotificationsAsync();
    
    // Schedule a daily reminder for habits
    scheduleHabitReminders();
    
    // Listen for incoming notifications when app is in foreground
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      const data = notification.request.content.data;
      showNotification(notification.request.content.body || 'Você tem uma notificação');
    });
    
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
    };
  }, []);

  const registerForPushNotificationsAsync = async () => {
    try {
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'Default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#63b7af',
        });
      }
      
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        // Permission not granted, but we can still use local notifications
        return;
      }
      
      // Save notification permission status
      await AsyncStorage.setItem('notificationPermission', finalStatus);
    } catch (error) {
      console.error('Error setting up notifications:', error);
    }
  };

  const scheduleHabitReminders = async () => {
    try {
      // Cancel any existing notifications first
      await Notifications.cancelAllScheduledNotificationsAsync();
      
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Hábitos Saudáveis',
          body: 'Não se esqueça de marcar seus hábitos de hoje!',
          data: { type: 'habit-reminder' },
        },
        trigger: {
            type: SchedulableTriggerInputTypes.DAILY, 
            hour: 15,
            minute: 0
        },
      });
    } catch (error) {
      console.error('Error scheduling habit reminders:', error);
    }
  };

  const scheduleRelaxReminder = async () => {
    try {
      const now = new Date();
      now.setHours(now.getHours() + 1); // Set for 1 hour from now
      
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Momento de Relaxar',
          body: 'Que tal tirar alguns minutos para respirar e relaxar?',
          data: { type: 'relax-reminder' },
        },
        trigger: {
            type: SchedulableTriggerInputTypes.DATE,
            date: now,
        },
      });
      
      showNotification('Lembrete de relaxamento configurado para daqui 1 hora');
    } catch (error) {
      console.error('Error scheduling relax reminder:', error);
    }
  };

  return {
    scheduleRelaxReminder,
  };
};