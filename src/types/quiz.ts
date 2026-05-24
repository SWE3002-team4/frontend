export type QuestionType = 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_ANSWER';
export type Difficulty = 'HIGH' | 'MEDIUM' | 'LOW';

export interface Question {
  id: string;
  type: QuestionType;
  difficulty: Difficulty;
  text: string;
  options?: string[]; // 객관식인 경우 존재
}

export interface QuizDetails {
  quizId: string;
  title: string;
  questions: Question[];
}
