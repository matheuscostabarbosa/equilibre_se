import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DiaryEntry as DiaryEntryType } from '../types';
import { theme } from '@theme/theme';
import Icon from 'react-native-vector-icons/Feather'; // Importe o ícone que você deseja usar
import { useRouter } from 'expo-router';

interface DiaryEntryProps {
  entry: DiaryEntryType;
  // onEdit: () => void; 
}

const getEmotionEmoji = (emotion: string | null) => {
  switch (emotion) {
    case 'feliz':
      return '😊';
    case 'ansioso':
      return '😟';
    case 'cansado':
      return '😩';
    case 'triste':
      return '😢';
    case 'motivado':
      return '🚀';
    default:
      return '';
  }
};

const DiaryEntry: React.FC<DiaryEntryProps> = ({ entry }) => {
  const emoji = entry.emotion ? getEmotionEmoji(entry.emotion) : '';

  // Use o hook useRouter para navegar
  const router = useRouter();

  const handleEdit = () => {
    // Navega para a rota dinâmica de edição passando o id corretamente
    router.push(`/diary/${entry.id}`); // Certifique-se de que o caminho está correto
  };
  
  return (
    <View style={styles.entryContainer}>
      <View style={styles.header}>
        <Text style={styles.dateTime}>{entry.date} {entry.time}</Text>
        <TouchableOpacity onPress={handleEdit}>
          <Icon name="edit" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {entry.emotion && (
        <View style={styles.emotionContainer}>
          <Text style={styles.emotionText}>
            {emoji} {entry.emotion}
          </Text>
        </View>
      )}

      {entry.text && (
        <Text style={styles.entryText}>{entry.text}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  entryContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.accent,
    ...theme.shadows.small,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  dateTime: {
    fontWeight: theme.typography.fontWeights.semiBold,
    fontSize: theme.typography.sizes.small,
    color: '#666',
  },
  emotionContainer: {
    marginVertical: theme.spacing.xs,
  },
  emotionText: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text,
  },
  entryText: {
    marginTop: theme.spacing.xs,
    fontSize: theme.typography.sizes.body,
    lineHeight: 20,
    color: theme.colors.text,
  },
});

export default DiaryEntry;
