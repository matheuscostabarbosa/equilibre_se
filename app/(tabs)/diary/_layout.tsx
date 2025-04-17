import React from 'react';
import { Stack } from 'expo-router'; 

export default function DiaryLayout() {
  return (
    <Stack>
      {/* Tela de índice, sem barra de navegação e título */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: false, // Esconde a barra de navegação (e o título)
        }}
      />
      
      {/* Tela de edição, também sem barra de navegação e título */}
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          title: 'Ajuste Seu Pensamento', 
        }}
      />
    </Stack>
  );
}