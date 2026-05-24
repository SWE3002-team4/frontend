import { ReviewResult } from '../types/exam';

const MOCK_REVIEW_DATA: ReviewResult = {
  attemptId: '1',
  subjectId: '1',
  title: '소프트웨어공학개론 제 1회 모의고사',
  finalScore: 66,
  results: [
    {
      question: {
        id: '1',
        type: 'SINGLE_CHOICE',
        difficulty: 'LOW',
        text: '다음 중 소프트웨어 생명주기 모델이 아닌 것은 무엇입니까?',
        options: ['폭포수 모델', '나선형 모델', 'V 모델', '피라미드 모델']
      },
      userAnswer: 'V 모델',
      isCorrect: false,
      keywords: ['소프트웨어 생명주기', '기초개념'],
      explanation: '폭포수 모델, 나선형 모델, V 모델은 모두 대표적인 소프트웨어 생명주기 모델입니다. 그러나 피라미드 모델은 공식적인 프로세스 생명주기로 사용되지 않는 가상의 개념입니다.'
    },
    {
      question: {
        id: '2',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        text: '애자일(Agile) 선언문의 4가지 핵심 기조 중 올바른 것을 모두 고르시오.',
        options: [
          '공정이나 도구보다 개인과 상호작용', 
          '포괄적인 문서보다 정상적으로 작동하는 소프트웨어', 
          '고객 협력보다 계약 협상', 
          '변화에 대응하기보다 계획 따르기'
        ]
      },
      userAnswer: ['공정이나 도구보다 개인과 상호작용', '포괄적인 문서보다 정상적으로 작동하는 소프트웨어'],
      isCorrect: true,
      keywords: ['Agile 방법론', '소프트웨어 방법론'],
      explanation: '애자일의 4가지 핵심 가치는 다음과 같습니다.\n1. 공정과 도구보다 개인과 상호작용을\n2. 포괄적인 문서보다 작동하는 소프트웨어를\n3. 계약 협상보다 고객과의 협력을\n4. 계획을 따르기보다 변화에 대응하기를 가치있게 여긴다.'
    },
    {
      question: {
        id: '3',
        type: 'SHORT_ANSWER',
        difficulty: 'HIGH',
        text: '객체지향 설계 원칙 (SOLID) 중 "소프트웨어 개체는 확장에 대해 열려 있어야 하고, 수정에 대해서는 닫혀 있어야 한다"는 원칙의 영문 약어는 무엇입니까?',
      },
      userAnswer: 'ocp',
      isCorrect: true,
      keywords: ['객체지향 설계 (SOLID)', 'OCP 원칙'],
      explanation: 'OCP (Open-Closed Principle, 개방-폐쇄 원칙)는 기존의 코드를 변경하지 않으면서(Closed), 기능을 추가할 수 있도록(Open) 설계가 되어야 한다는 객체지향 설계의 핵심 원칙 중 하나입니다.'
    }
  ]
};

class ReviewService {
  async getAttemptResult(id: string): Promise<ReviewResult> {
    // API 호출 딜레이 모방
    await new Promise(resolve => setTimeout(resolve, 600));
    return MOCK_REVIEW_DATA;
  }
}

export const reviewService = new ReviewService();
