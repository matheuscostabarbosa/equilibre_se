import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { theme } from '@theme/theme';
import ActivityCard from '@features/relax/components/ActivityCard';
import BreathingExercise from '@features/relax/BreathingExercise';
import TextMeditation from '@features/relax/TextMeditation';
import MotivationalQuote from '@features/relax/components/MotivationQuote';
import GroundingTechnique from '@features/relax/GroudingTechnique';

const RelaxScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ActivityCard title="Exercício de Respiração">
          <BreathingExercise />
        </ActivityCard>
        
        <ActivityCard title="Meditação Guiada (Texto)">
          <TextMeditation />
        </ActivityCard>
        
        <ActivityCard title="Frase Motivacional">
          <MotivationalQuote />
        </ActivityCard>
        
        <ActivityCard title="Técnica de Grounding">
          <GroundingTechnique />
        </ActivityCard>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.spacing.md,
  },
});

export default RelaxScreen;
