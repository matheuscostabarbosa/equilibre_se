import { theme } from '@theme/theme';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const meditations = [
  "Feche os olhos. Respire fundo 3 vezes. Sinta o peso do seu corpo na cadeira ou no chão. Apenas observe seus pensamentos, sem julgamento.",
  "Concentre-se na sua respiração. Sinta o ar frio entrando pelo nariz e o ar quente saindo. Se sua mente divagar, gentilmente traga o foco de volta à respiração.",
  "Imagine um lugar calmo e seguro. Pode ser uma praia, uma floresta, ou qualquer lugar que te traga paz. Passe alguns momentos lá.",
  "Faça uma varredura corporal. Comece pelos pés e suba lentamente, notando qualquer sensação em cada parte do corpo, liberando qualquer tensão.",
];

const TextMeditation = () => {
  const [currentMeditation, setCurrentMeditation] = useState(meditations[0]);
  
  const getNextMeditation = () => {
    const currentIndex = meditations.indexOf(currentMeditation);
    const nextIndex = (currentIndex + 1) % meditations.length;
    setCurrentMeditation(meditations[nextIndex]);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.meditationText}>{currentMeditation}</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={getNextMeditation}
      >
        <Text style={styles.buttonText}>Próxima Dica</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  meditationText: {
    fontSize: theme.typography.sizes.body,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    color: '#555',
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

export default TextMeditation;