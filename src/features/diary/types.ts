export type EmotionType = 'feliz' | 'ansioso' | 'cansado' | 'triste' | 'motivado' | null;

export interface DiaryEntry {
  id?: string;
  emotion: EmotionType;
  text: string;
  date: string;
  time: string;
  timestamp?: number;
}

export interface EmotionButtonProps {
  emotion: EmotionType;
  label: string;
  emoji: string;
  isSelected: boolean;
  onSelect: (emotion: EmotionType) => void;
}