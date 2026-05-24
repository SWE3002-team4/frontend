import { QuizDetails } from '../types/quiz';

const MOCK_QUIZ_DETAILS: QuizDetails = {
  quizId: '1',
  title: '01강: 소프트웨어 생명주기 모델 퀴즈',
  questions: [
    {
      id: 'q1',
      type: 'SINGLE_CHOICE',
      difficulty: 'LOW',
      text: '다음 중 소프트웨어 생명주기 모델이 아닌 것은 무엇입니까?',
      options: ['폭포수 모델', '나선형 모델', 'V 모델', '피라미드 모델'],
    },
    {
      id: 'q2',
      type: 'MULTIPLE_CHOICE',
      difficulty: 'MEDIUM',
      text: '애자일(Agile) 선언문의 4가지 핵심 기조 중 올바른 것을 모두 고르시오.',
      options: [
        '공정이나 도구보다 개인과 상호작용', 
        '포괄적인 문서보다 정상적으로 작동하는 소프트웨어', 
        '고객 협력보다 계약 협상', 
        '변화에 대응하기보다 계획 따르기'
      ],
    },
    {
      id: 'q3',
      type: 'SHORT_ANSWER',
      difficulty: 'HIGH',
      text: '객체지향 설계 원칙 (SOLID) 중 "소프트웨어 개체는 확장에 대해 열려 있어야 하고, 수정에 대해서는 닫혀 있어야 한다"는 원칙의 영문 약어는 무엇입니까?',
    }
  ]
};

class QuizService {
  async getQuizDetails(id: string): Promise<QuizDetails> {
    // API 호출 지연 모방
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_QUIZ_DETAILS;
  }

  async postSubmitAnswers(data: Record<string, any>): Promise<boolean> {
    // 서버 전송 로직 모방
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('[QuizService] Submitted answers:', data);
    return true;
  }
}

export const quizService = new QuizService();
