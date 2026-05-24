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
    // AI 생성 딜레이 모방 (약 1.5초)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 선택된 문항 수만큼 임의의 질문 생성
    const generatedQuestions = Array.from({ length: payload.questionCount }, (_, i) => ({
      id: `mock-q-${i + 1}`,
      type: i % 3 === 0 ? 'MULTIPLE_CHOICE' : (i % 3 === 1 ? 'SHORT_ANSWER' : 'SINGLE_CHOICE') as any,
      difficulty: i % 2 === 0 ? 'MEDIUM' : 'HIGH' as any,
      text: `AI 생성 맞춤형 문제 ${i + 1} (약점 키워드 기반)`,
      options: i % 3 !== 1 ? [`옵션 A-${i}`, `옵션 B-${i}`, `옵션 C-${i}`, `옵션 D-${i}`] : undefined
    }));

    return {
      examId: `mock-${Date.now()}`,
      title: 'AI 맞춤형 모의고사',
      questions: generatedQuestions
    };
  }
}

export const examService = new ExamService();
