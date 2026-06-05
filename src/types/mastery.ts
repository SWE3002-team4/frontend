export interface SubjectMasteryKeyword {
  keywordId: string;
  name: string;
  masteryScore: number; // 0.0 ~ 1.0
}

export interface SubjectMasteryResponse {
  subjectId: string;
  overallMastery: number; // attempted keyword mastery 평균, 0.0 ~ 1.0
  strongKeywords: SubjectMasteryKeyword[]; // masteryScore >= 0.7
  weakKeywords: SubjectMasteryKeyword[]; // masteryScore < 0.4
}

export interface UpdatedMasteryItem {
  keywordId: string;
  masteryScore: number; // 0.0 ~ 1.0
}
