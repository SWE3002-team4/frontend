import { Question } from './quiz';
import { Keyword } from './subject';

export interface UserMastery {
  subjectId: string;
  overallMastery: number;
  weakKeywords: Keyword[];
}

export interface ExamSettings {
  subjectId: string;
  selectedLectures: string[];
  questionCount: number;
}

export interface MockExamSession {
  examId: string;
  title: string;
  questions: Question[];
}

export interface QuestionResult {
  question: Question;
  userAnswer: any;
  isCorrect: boolean;
  explanation: string;
  keywords: string[];
  correctAnswer: string;
  choices?: { id: string; choiceText: string; isCorrect: boolean }[];
}

export interface ReviewResult {
  attemptId: string;
  subjectId: string;
  title: string;
  finalScore: number;
  results: QuestionResult[];
}
