import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { theme } from '../theme/theme';

const NotificationBar = () => {
  const { currentNotification } = useAppContext();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (currentNotification?.isVisible) {
      // Fade in
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Fade out
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [currentNotification?.isVisible]);

  if (!currentNotification) return null;

  const getBackgroundColor = () => {
    switch (currentNotification.type) {
      case 'error':
        return theme.colors.error;
      case 'success':
        return theme.colors.success;
      default:
        return 'rgba(0, 0, 0, 0.7)';
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity, backgroundColor: getBackgroundColor() },
      ]}
      pointerEvents="none"
    >
      <Text style={styles.message}>{currentNotification.message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius,
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.body,
    fontFamily: theme.typography.fontFamily,
    textAlign: 'center',
  },
});

export default NotificationBar;