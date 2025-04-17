import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ActivityCardProps } from '../types';
import { theme } from '@theme/theme';

const ActivityCard: React.FC<ActivityCardProps> = ({ 
  title, 
  children, 
  actionButton 
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
      {actionButton}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.medium,
  },
  cardTitle: {
    fontSize: theme.typography.sizes.title,
    fontWeight: theme.typography.fontWeights.semiBold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
});

export default ActivityCard;
