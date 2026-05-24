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
