import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DiaryEntry } from '@features/diary/types';
import { Habit } from '@features/habits/types';

interface AppContextProps {
  diaryEntries: DiaryEntry[];
  habits: Habit[];
  saveEntry: (entry: DiaryEntry) => Promise<void>;
  updateEntry: (entry: DiaryEntry) => Promise<void>; 
  updateHabit: (habitId: string, isDone: boolean) => Promise<void>;
  showNotification: (message: string, type?: 'info' | 'error' | 'success') => void;
  currentNotification: {
    message: string;
    type: string;
    isVisible: boolean;
  } | null;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

const initialHabits: Habit[] = [
  { id: 'water', name: 'Beber Água (2L)', doneToday: false },
  { id: 'sleep', name: 'Dormir 8h', doneToday: false },
  { id: 'meditate', name: 'Meditar (10min)', doneToday: false },
  { id: 'exercise', name: 'Atividade Física (30min)', doneToday: false }
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [notification, setNotification] = useState<{
    message: string;
    type: string;
    isVisible: boolean;
  } | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const entriesJson = await AsyncStorage.getItem('diaryEntries');
        if (entriesJson) {
          setDiaryEntries(JSON.parse(entriesJson));
        }

        const today = new Date().toDateString();
        const updatedHabits = await Promise.all(
          habits.map(async (habit) => {
            const habitState = await AsyncStorage.getItem(`habit-${habit.id}-${today}`);
            return {
              ...habit,
              doneToday: habitState ? JSON.parse(habitState) : false
            };
          })
        );
        setHabits(updatedHabits);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const saveEntry = async (entry: DiaryEntry) => {
    try {
      const updatedEntries = [entry, ...diaryEntries];
      if (updatedEntries.length > 20) {
        updatedEntries.pop();
      }
      
      setDiaryEntries(updatedEntries);
      await AsyncStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));
      showNotification('Entrada salva com sucesso!', 'success');
    } catch (error) {
      console.error('Error saving diary entry:', error);
      showNotification('Erro ao salvar entrada.', 'error');
    }
  };

  const updateEntry = async (updatedEntry: DiaryEntry) => {
    try {
      const updatedEntries = diaryEntries.map(entry =>
        entry.id === updatedEntry.id ? updatedEntry : entry
      );
  
      setDiaryEntries(updatedEntries);
      await AsyncStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));
      showNotification('Entrada atualizada com sucesso!', 'success');
    } catch (error) {
      console.error('Error updating diary entry:', error);
      showNotification('Erro ao atualizar entrada.', 'error');
    }
  };

  const updateHabit = async (habitId: string, isDone: boolean) => {
    try {
      const today = new Date().toDateString();
      const updatedHabits = habits.map(habit => 
        habit.id === habitId ? { ...habit, doneToday: isDone } : habit
      );
      
      setHabits(updatedHabits);
      await AsyncStorage.setItem(`habit-${habitId}-${today}`, JSON.stringify(isDone));
      
      const habitName = habits.find(h => h.id === habitId)?.name || '';
      showNotification(`Hábito "${habitName}" ${isDone ? 'marcado' : 'desmarcado'}!`, 'info');
    } catch (error) {
      console.error('Error updating habit:', error);
      showNotification('Erro ao atualizar hábito.', 'error');
    }
  };

  const showNotification = (message: string, type: 'info' | 'error' | 'success' = 'info') => {
    setNotification({ message, type, isVisible: true });
    
    setTimeout(() => {
      setNotification(prev => prev ? { ...prev, isVisible: false } : null);
    }, 3000);
  };

  return (
    <AppContext.Provider value={{ diaryEntries, habits, saveEntry, updateEntry, updateHabit, showNotification, currentNotification: notification }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
