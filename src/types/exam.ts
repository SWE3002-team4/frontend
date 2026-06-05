import { Question } from './quiz';
import { Keyword } from './subject';

export interface UserMastery {
  subjectId: string;
  overallMastery: number;
  weakKeywords: Keyword[];
}

export interface CreateMockExamRequest {
  quizProblemCount: number; // required, 1~50
  documentIds?: string[]; // optional
  targetWeakKeywords?: boolean; // optional, default true
  keywordIds?: string[]; // optional
}

export interface CreateMockExamResponse {
  mockExamId: string;
  quizId: string;
  quizType: 'MOCK_EXAM';
  quizProblemCount: number;
}

export type AttemptStatus = 'IN_PROGRESS' | 'SUBMITTED' | 'GRADED';

export interface MockExamLatestAttempt {
  attemptId: string;
  status: AttemptStatus;
  startedAt: string; // ISO datetime
  submittedAt: string | null; // ISO datetime
  totalQuizProblems: number | null;
  correctCount: number | null;
  score: number | null;
}

export interface MockExamListItem {
  mockExamId: string;
  quizId: string;
  subjectId: string;
  title: string;
  quizProblemCount: number;
  targetWeakKeywords: boolean;
  generatedFromMastery: boolean;
  createdAt: string; // ISO datetime
  latestAttempt: MockExamLatestAttempt | null;
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
