import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { EmotionType } from '@features/diary/types';
import { theme } from '@theme/theme';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAppContext } from '@context/AppContext';

const EditEntryScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const entryId = id as string;
  const { diaryEntries, updateEntry } = useAppContext();
  const entry = diaryEntries.find((e) => e.id === entryId);

  const [text, setText] = useState(entry?.text || '');
  const [emotion, setEmotion] = useState<EmotionType | null>(entry?.emotion || null);

  // Verificação para garantir que a navegação só aconteça quando o entry estiver carregado
  useEffect(() => {
    if (!entry) {
        router.replace('/+not-found');
      }
  }, [entry, router]);

  // Se o entry ainda não foi encontrado, mostra a tela de carregamento
  if (!entry) {
    router.replace('/+not-found');
    // return (
    //   <View style={styles.loadingContainer}>
    //     <ActivityIndicator size="large" color={theme.colors.primary} />
    //     <Text style={styles.loadingText}>Carregando entrada...</Text>
    //   </View>
    // );
  }

  const emotions = [
    { type: 'feliz', label: 'Feliz', emoji: '😊' },
    { type: 'ansioso', label: 'Ansioso', emoji: '😟' },
    { type: 'cansado', label: 'Cansado', emoji: '😩' },
    { type: 'triste', label: 'Triste', emoji: '😢' },
    { type: 'motivado', label: 'Motivado', emoji: '🚀' },
  ];

  const handleSave = () => {
    if (!entry) return;

    updateEntry({
      ...entry,
      text,
      emotion,
    });

    router.back(); 
  };

  const handleEmotionSelect = (selected: EmotionType) => {
    setEmotion(emotion === selected ? null : selected);
  };


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.question}>Atualize como você estava se sentindo</Text>

        <View style={styles.emotionsContainer}>
          {emotions.map((item) => (
            <TouchableOpacity
              key={item.type}
              style={[
                styles.emotionButton,
                emotion === item.type && styles.emotionButtonSelected,
              ]}
              onPress={() => handleEmotionSelect(item.type as EmotionType)}
            >
              <Text style={styles.emotionText}>
                {item.emoji} {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Atualize seu pensamento..."
          value={text}
          onChangeText={setText}
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Tudo pronto</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Deixa pra lá</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </View>
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
  backButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius,
    padding: theme.spacing.md,
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  backButtonText: {
    color: theme.colors.text,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.button,
    fontWeight: theme.typography.fontWeights.regular,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text,
  },
});

export default EditEntryScreen;
