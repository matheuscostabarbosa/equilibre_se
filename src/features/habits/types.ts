export interface Habit {
    id: string;
    name: string;
    doneToday: boolean;
    streak?: number;
    lastCompleted?: string;
  }