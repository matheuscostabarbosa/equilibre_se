import { useAppContext } from '@context/AppContext';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { theme } from '@theme/theme';
import HabitItem from '@features/habits/components/HabitItem';

const HabitsScreen = () => {
  const { habits } = useAppContext();
  
  // Calculate completion percentage for visualization
  const completedHabits = habits.filter(habit => habit.doneToday).length;
  const completionPercentage = habits.length > 0 
    ? Math.round((completedHabits / habits.length) * 100) 
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.habitListContainer}>
          <Text style={styles.sectionTitle}>Hábitos para Hoje</Text>
          {habits.map(habit => (
            <HabitItem key={habit.id} habit={habit} />
          ))}
        </View>
        
        <View style={styles.habitTrackerContainer}>
          <Text style={styles.sectionTitle}>Progresso Visual</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${completionPercentage}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {completedHabits} de {habits.length} hábitos completados hoje ({completionPercentage}%)
          </Text>
        </View>
        
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Estatísticas</Text>
          <View style={styles.statCard}>
            <Text style={styles.statText}>
              Melhor fase: <Text style={styles.statHighlight}>Em progresso</Text>
            </Text>
            <Text style={styles.statText}>
              Hábito mais consistente: <Text style={styles.statHighlight}>Em análise</Text>
            </Text>
            <Text style={styles.statText}>
              Dias ativos: <Text style={styles.statHighlight}>1</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Estilos com StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.spacing.md,
  },
  habitListContainer: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.title,
    fontWeight: theme.typography.fontWeights.semiBold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondary,
    paddingBottom: theme.spacing.xs,
  },
  habitTrackerContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.small,
  },
  progressBarContainer: {
    height: 20,
    backgroundColor: theme.colors.grey,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: theme.spacing.sm,
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  progressText: {
    textAlign: 'center',
    marginTop: theme.spacing.xs,
    color: theme.colors.text,
  },
  statsContainer: {
    marginBottom: theme.spacing.lg,
  },
  statCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius,
    padding: theme.spacing.md,
    ...theme.shadows.small,
  },
  statText: {
    fontSize: theme.typography.sizes.body,
    marginBottom: theme.spacing.sm,
    color: theme.colors.text,
  },
  statHighlight: {
    fontWeight: theme.typography.fontWeights.semiBold,
    color: theme.colors.primary,
  },
});

export default HabitsScreen;
