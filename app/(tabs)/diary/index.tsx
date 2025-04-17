import { useAppContext } from '@context/AppContext';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { theme } from '@theme/theme';
import { EmotionType } from '@features/diary/types';
import DiaryEntry from '@features/diary/components/DiaryEntry';

const DiaryScreen = () => {
  const { diaryEntries, saveEntry } = useAppContext();
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>(null);
  const [entryText, setEntryText] = useState('');

  const emotions = [
    { type: 'feliz', label: 'Feliz', emoji: '😊' },
    { type: 'ansioso', label: 'Ansioso', emoji: '😟' },
    { type: 'cansado', label: 'Cansado', emoji: '😩' },
    { type: 'triste', label: 'Triste', emoji: '😢' },
    { type: 'motivado', label: 'Motivado', emoji: '🚀' },
  ];

  const handleEmotionSelect = (emotion: EmotionType) => {
    setSelectedEmotion(selectedEmotion === emotion ? null : emotion);
  };

  const handleSaveEntry = () => {
    if (!selectedEmotion && entryText.trim() === '') {
      return;
    }

    const timestamp = new Date();
    const entry = {
      id: Date.now().toString(),
      emotion: selectedEmotion,
      text: entryText.trim(),
      date: timestamp.toLocaleDateString('pt-BR'),
      time: timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      timestamp: timestamp.getTime(),
    };

    saveEntry(entry);
    setSelectedEmotion(null);
    setEntryText('');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.question}>Como você está se sentindo hoje?</Text>

        <View style={styles.emotionsContainer}>
          {emotions.map((emotion) => (
            <TouchableOpacity
              key={emotion.type}
              style={[
                styles.emotionButton,
                selectedEmotion === emotion.type && styles.emotionButtonSelected,
              ]}
              onPress={() => handleEmotionSelect(emotion.type as EmotionType)}
            >
              <Text style={styles.emotionText}>{emotion.emoji} {emotion.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.textInput}
          placeholder="Escreva um desabafo ou seus pensamentos aqui..."
          value={entryText}
          onChangeText={setEntryText}
          multiline
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveEntry}>
          <Text style={styles.saveButtonText}>Guardar pensamento</Text>
        </TouchableOpacity>

        <View style={styles.entriesContainer}>
          <Text style={styles.entriesTitle}>Suas últimas reflexões:</Text>

          {diaryEntries.length === 0 ? (
            <Text style={styles.noEntriesText}>Você ainda não escreveu nada no diário. Que tal começar hoje?</Text>
          ) : (
            diaryEntries.map((entry) => (
              <DiaryEntry key={entry.id || `${entry.date}-${entry.time}`} entry={entry} />
            ))
          )}
        </View>
      </ScrollView>
    </View>
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
  question: {
    fontSize: theme.typography.sizes.button,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  emotionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: theme.spacing.lg,
  },
  emotionButton: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius,
    borderWidth: 1,
    borderColor: theme.colors.accent,
  },
  emotionButtonSelected: {
    backgroundColor: theme.colors.primary,
  },
  emotionText: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text,
  },
  textInput: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: theme.spacing.sm,
    minHeight: 100,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.body,
    marginBottom: theme.spacing.md,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius,
    padding: theme.spacing.md,
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  saveButtonText: {
    color: theme.colors.white,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.button,
    fontWeight: theme.typography.fontWeights.semiBold,
  },
  entriesContainer: {
    marginTop: theme.spacing.md,
  },
  entriesTitle: {
    fontSize: theme.typography.sizes.title,
    fontWeight: theme.typography.fontWeights.semiBold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondary,
    paddingBottom: theme.spacing.xs,
  },
  noEntriesText: {
    textAlign: 'center',
    color: '#888',
    marginTop: theme.spacing.lg,
  },
});

export default DiaryScreen;
