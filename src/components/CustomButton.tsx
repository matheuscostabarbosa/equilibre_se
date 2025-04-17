import { theme } from '@theme/theme';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  label: string;
  onPress: () => void;
}

export default function CustomButton({ label, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: theme.borderRadius,
    alignItems: 'center',
  },
  label: {
    color: theme.colors.white,
    fontWeight: '600',
  },
});
