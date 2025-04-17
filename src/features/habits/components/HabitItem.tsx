import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Habit } from '../types';
import { useAppContext } from '@context/AppContext';
import { theme } from '@theme/theme';

interface HabitItemProps {
  habit: Habit;
}

const HabitItem: React.FC<HabitItemProps> = ({ habit }) => {
  const { updateHabit } = useAppContext();

  const toggleHabit = () => {
    updateHabit(habit.id, !habit.doneToday);
  };

  return (
    <TouchableOpacity
      style={[styles.habitContainer, habit.doneToday && { backgroundColor: `${theme.colors.secondary}30` }]}
      onPress={toggleHabit}
      activeOpacity={0.7}
    >
      <View style={styles.checkboxContainer}>
        {habit.doneToday ? (
          <Ionicons name="checkmark-circle" size={24} color={theme.colors.primary} />
        ) : (
          <Ionicons name="ellipse-outline" size={24} color="#aaa" />
        )}
      </View>

      <View style={styles.habitInfo}>
        <Text style={[styles.habitName, habit.doneToday && styles.doneText]}>
          {habit.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  habitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.small,
  },
  checkboxContainer: {
    marginRight: theme.spacing.md,
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeights.regular,
  },
  doneText: {
    color: '#888',
    textDecorationLine: 'line-through',
  },
});

export default HabitItem;
