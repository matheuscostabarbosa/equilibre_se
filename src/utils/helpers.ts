import { DiaryEntry } from '../features/diary/types';
import { Habit } from '../features/habits/types';

/**
 * Get an emoji for a given emotion
 */
export const getEmotionEmoji = (emotion: string | null): string => {
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

/**
 * Format date to local Brazilian format
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('pt-BR');
};

/**
 * Format time to show only hours and minutes
 */
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

/**
 * Get a random item from an array
 */
export const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Count habits completed for a specific day
 */
export const countCompletedHabits = (habits: Habit[]): number => {
  return habits.filter(habit => habit.doneToday).length;
};

/**
 * Group diary entries by date
 */
export const groupEntriesByDate = (entries: DiaryEntry[]): Record<string, DiaryEntry[]> => {
  return entries.reduce((groups, entry) => {
    const date = entry.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(entry);
    return groups;
  }, {} as Record<string, DiaryEntry[]>);
};

/**
 * Calculate average mood for a set of entries
 */
export const calculateAverageMood = (entries: DiaryEntry[]): string => {
  const emotionCount: Record<string, number> = {};
  
  entries.forEach(entry => {
    if (entry.emotion) {
      emotionCount[entry.emotion] = (emotionCount[entry.emotion] || 0) + 1;
    }
  });
  
  let mostFrequentEmotion = '';
  let highestCount = 0;
  
  Object.entries(emotionCount).forEach(([emotion, count]) => {
    if (count > highestCount) {
      mostFrequentEmotion = emotion;
      highestCount = count;
    }
  });
  
  return mostFrequentEmotion;
};