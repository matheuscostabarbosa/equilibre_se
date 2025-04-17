export interface ActivityItem {
    id: string;
    title: string;
    description: string;
    type: 'breathing' | 'meditation' | 'quote' | 'grounding';
  }
  
  export interface BreathingSessionProps {
    onComplete?: () => void;
  }
  
  export interface ActivityCardProps {
    title: string;
    children: React.ReactNode;
    actionButton?: React.ReactNode;
  }