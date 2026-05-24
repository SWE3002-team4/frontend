import { useState, useEffect } from 'react';
import { UserMastery, ExamSettings } from '../types/exam';
import { examService } from '../services/examService';

export function useMockExam(subjectId: string) {
  const [masteryData, setMasteryData] = useState<UserMastery | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    async function fetchMastery() {
      try {
        const data = await examService.getSubjectMastery(subjectId);
        setMasteryData(data);
      } catch (error) {
        console.error('Failed to fetch mastery data', error);
      }
    }
    fetchMastery();
  }, [subjectId]);

  const generatePersonalizedExam = async (settings: ExamSettings): Promise<boolean> => {
    setIsGenerating(true);
    try {
      const examSession = await examService.postGenerateMockExam(settings);
      
      // Store in sessionStorage to mock global state transitions to QuizTakingContainer
      sessionStorage.setItem('MOCK_EXAM_SESSION', JSON.stringify(examSession));
      
      return true;
    } catch (error) {
      console.error('Failed to generate mock exam', error);
      return false;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    masteryData,
    isGenerating,
    generatePersonalizedExam
  };
}
