import { UserMastery, ExamSettings, MockExamSession } from '../types/exam';

class ExamService {
  async getSubjectMastery(subjectId: string): Promise<UserMastery> {
    // API 호출 모방
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      subjectId,
      overallMastery: 65,
      weakKeywords: ['위험분석', '나선형 모델', 'OCP 원칙']
    };
  }

  async postGenerateMockExam(payload: ExamSettings): Promise<MockExamSession> {
    // API 연결 전까지 임시로 빈 배열 반환 (Mock 로직 제거)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      examId: `mock-${Date.now()}`,
      title: 'AI 맞춤형 모의고사',
      questions: []
    };
  }
}

export const examService = new ExamService();
