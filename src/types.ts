export interface Vocabulary {
  id: string;
  word: string;
  definition: string;
  example: string;
  pronunciation?: string;
  category: string;
  unit: number;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  grammarFocus: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  unit: number;
}

export interface SentencePractice {
  id: string;
  correctSentence: string;
  shuffledWords: string[];
  hint: string;
  unit: number;
}

export type TestDifficulty = 'Easy' | 'Medium' | 'Advanced';

export interface TestQuestion {
  id: string;
  type: 'mcq' | 'rearrange' | 'typing' | 'context';
  question: string;
  options?: string[];
  correctAnswer: string;
  hint?: string;
  unit: number;
  difficulty: TestDifficulty;
}
