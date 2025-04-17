import { theme } from '@theme/theme';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const techniques = [
  "Nomeie 5 coisas que você pode ver ao seu redor.",
  "Identifique 4 coisas que você pode tocar agora.",
  "Preste atenção a 3 sons que você pode ouvir.",
  "Encontre 2 cheiros no ambiente.",
  "Concentre-se em 1 coisa que você pode saborear (ou a sensação na sua boca)."
];

const GroundingTechnique = () => {
  const [currentTechnique, setCurrentTechnique] = useState(techniques[0]);
  
  const getNextTechnique = () => {
    const currentIndex = techniques.indexOf(currentTechnique);
    const nextIndex = (currentIndex + 1) % techniques.length;
    setCurrentTechnique(techniques[nextIndex]);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.techniqueText}>{currentTechnique}</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={getNextTechnique}
      >
        <Text style={styles.buttonText}>Próxima Técnica</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  techniqueText: {
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

export default GroundingTechnique;