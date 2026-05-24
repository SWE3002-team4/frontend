export interface Subject {
  id: string;
  title: string;
  progress: number;
  imageUrl: string;
}

export interface CreateSubjectDto {
  title: string;
  imageFile: File | null;
}

export interface Lecture {
  id: string;
  title: string;
}

export type Keyword = string;

export interface ExamResult {
  id: string;
  name: string;
  score: string;
}

export interface DashboardInfo {
  subjectId: string;
  subjectName: string;
  lectures: Lecture[];
  mastery: number;
  coverage: number;
  strongKeywords: Keyword[];
  weakKeywords: Keyword[];
  history: ExamResult[];
}

export interface LectureDetail {
  materialId: string;
  title: string;
  pdfUrl: string;
  summaryText: string;
  strongKeywords: Keyword[];
  weakKeywords: Keyword[];
  masteryScore: number;
  coverageScore: number;
}
