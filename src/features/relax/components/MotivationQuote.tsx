import { theme } from '@theme/theme';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const quotes = [
  "Acredite em você mesmo e tudo será possível.",
  "A gentileza é a linguagem que o surdo pode ouvir e o cego pode ver.",
  "Seu único limite é você.",
  "Respire fundo. Isso é apenas um capítulo ruim, não a história toda.",
  "Pequenos passos todos os dias levam a grandes resultados.",
  "Você é mais forte do que pensa."
];

const MotivationalQuote = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  
  const getNextQuote = () => {
    const currentIndex = quotes.indexOf(currentQuote);
    const nextIndex = (currentIndex + 1) % quotes.length;
    setCurrentQuote(quotes[nextIndex]);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.quoteText}>"{currentQuote}"</Text>
      <TouchableOpacity style={styles.button} onPress={getNextQuote}>
        <Text style={styles.buttonText}>Nova Frase</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  quoteText: {
    fontSize: theme.typography.sizes.title,
    fontWeight: theme.typography.fontWeights.light,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    color: theme.colors.primary,
    lineHeight: 28,
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

export default MotivationalQuote;
