import { QuizDetails, QuizSolvingViewResponseDto, Question, Difficulty, DocumentQuizResponseDto } from '../types/quiz';
import { apiClient } from './apiClient';

class QuizService {
  async getQuizDetails(quizId: string): Promise<QuizDetails> {
    const response = await apiClient.get<QuizSolvingViewResponseDto>(`/quiz/${quizId}`);
    const data = response.data;
    
    const questions: Question[] = data.quizProblems.map(p => {
      // Map Backend DifficultyLevel to Frontend Difficulty
      let diff: Difficulty = 'MEDIUM';
      if (p.difficulty === 'HARD') diff = 'HIGH';
      else if (p.difficulty === 'EASY') diff = 'LOW';
      
      return {
        id: p.id,
        type: p.quizProblemType,
        difficulty: diff,
        text: p.problemText,
        options: p.choices.map(c => ({
          id: c.id,
          text: c.choiceText
        }))
      };
    });

    return {
      quizId: data.id,
      title: data.title,
      questions: questions,
    };
  }

  async postSubmitAnswers(data: Record<string, any>): Promise<boolean> {
    // 서버 전송 로직 모방
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('[QuizService] Submitted answers:', data);
    return true;
  }

  async getDocumentQuizzes(documentId: string): Promise<DocumentQuizResponseDto[]> {
    const response = await apiClient.get<DocumentQuizResponseDto[]>(`/documents/${documentId}/quiz`);
    return response.data;
  }
}

export const quizService = new QuizService();
