export interface User {
  name: string;
  avatar: string;
  grade: string;
}

export interface SubjectItem {
  id: string;
  title: string;
  type: 'exam' | 'assignment' | 'activity' | 'feedback';
  score?: string | number;
  scoreLabel?: string; // e.g., "A", "92/100"
  date: string;
  summary?: string;
  tags?: string[];
  image?: string;
  teacherFeedback?: {
    avatar: string;
    name: string;
    date: string;
    content: string;
    audioDuration?: string;
    attachment?: string;
  };
}

export interface SubjectUnit {
  id: string;
  title: string;
  items: SubjectItem[];
}

export interface Subject {
  id: string;
  name: string;
  units: SubjectUnit[];
}