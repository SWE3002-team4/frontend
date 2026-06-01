import { ReviewResult } from '../types/exam';

class ReviewService {
  async getAttemptResult(id: string): Promise<ReviewResult> {
    // API 연결 전 임시 빈 데이터 반환 (Mock 삭제됨)
    return {
      attemptId: id,
      subjectId: '',
      title: '결과 없음',
      finalScore: 0,
      results: []
    };
  }
}

export const reviewService = new ReviewService();
