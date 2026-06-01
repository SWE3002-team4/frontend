import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Question, QuizDetails } from '../types/quiz';
import { quizService } from '../services/quizService';

export function useQuizSession(quizId: string | null) {
  const router = useRouter();
  const [quizDetails, setQuizDetails] = useState<QuizDetails | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadQuiz() {
      if (!quizId) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const data = await quizService.getQuizDetails(quizId);
        setQuizDetails(data);
      } catch (error) {
        console.error('Failed to load quiz:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadQuiz();
  }, [quizId]);

  const saveAnswer = (questionId: string, value: any) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (quizDetails && currentIndex < quizDetails.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const submitAll = async () => {
    setIsSubmitting(true);
    try {
      const success = await quizService.postSubmitAnswers(userAnswers);
      if (success) {
        // 성공 시 리뷰 페이지로 이동. 임시로 하드코딩된 examId 1 사용
        router.push('/exam/1/review');
      }
    } catch (error) {
      console.error('Failed to submit quiz:', error);
      setIsSubmitting(false);
    }
  };

  const currentQuestion: Question | null = quizDetails ? quizDetails.questions[currentIndex] : null;
  const isLastQuestion = quizDetails ? currentIndex === quizDetails.questions.length - 1 : false;
  const totalQuestions = quizDetails ? quizDetails.questions.length : 0;

  return {
    quizDetails,
    currentQuestion,
    currentIndex,
    totalQuestions,
    userAnswers,
    isLastQuestion,
    isLoading,
    isSubmitting,
    saveAnswer,
    handleNext,
    submitAll
  };
}
