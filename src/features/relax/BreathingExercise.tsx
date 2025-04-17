import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { BreathingSessionProps } from './types';
import { theme } from '@theme/theme';

const BreathingExercise: React.FC<BreathingSessionProps> = ({ onComplete }) => {
  const [isActive, setIsActive] = useState(false);
  const [instruction, setInstruction] = useState('Inspire...');
  const animation = useRef(new Animated.Value(0.8)).current;
  
  useEffect(() => {
    if (isActive) {
      startAnimation();
    } else {
      animation.setValue(0.8); // Reset to initial size
    }
    
    return () => {
      // Clean up animations when component unmounts
      animation.stopAnimation();
    };
  }, [isActive]);
  
  const startAnimation = () => {
    // Create sequence of animations for a complete breath cycle
    Animated.sequence([
      // Inhale - grow
      Animated.timing(animation, {
        toValue: 1.2,
        duration: 4000, // 4 seconds to inhale
        useNativeDriver: true,
      }),
      // Exhale - shrink
      Animated.timing(animation, {
        toValue: 0.8,
        duration: 4000, // 4 seconds to exhale
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      // If animation finishes and we're still active, start again
      if (finished && isActive) {
        // Change instruction before next cycle
        setInstruction(instruction === 'Inspire...' ? 'Expire...' : 'Inspire...');
        startAnimation();
      }
    });
  };
  
  const toggleBreathing = () => {
    const newIsActive = !isActive;
    setIsActive(newIsActive);
    
    if (newIsActive) {
      setInstruction('Inspire...');
    } else if (onComplete) {
      onComplete();
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Animated.View
          style={[{ transform: [{ scale: animation }] }]}
        />
        <Text style={styles.instructionText}>{instruction}</Text>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={toggleBreathing}>
        <Text style={styles.buttonText}>
          {isActive ? 'Parar Respiração' : 'Iniciar Respiração'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
    height: 150,
  },
  instructionText: {
    marginTop: theme.spacing.lg,
    fontSize: theme.typography.sizes.title,
    fontWeight: theme.typography.fontWeights.semiBold,
    color: theme.colors.primary,
  },
  button: {
    backgroundColor: theme.colors.accent,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius,
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.button,
  },
});

export default BreathingExercise;
