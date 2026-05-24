import { useState, useCallback, useEffect } from 'react';
import { LectureDetail } from '../types/subject';
import { lectureService } from '../services/lectureService';

export function useLectureDetail(lectureId: string) {
  const [lectureData, setLectureData] = useState<LectureDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getLectureContent = useCallback(async (id: string) => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await lectureService.getLectureDetail(id);
      setLectureData(data);
    } catch (err) {
      console.error(err);
      setError('강의 상세 자료를 불러오는 데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const postRequestQuiz = async (id: string): Promise<boolean> => {
    try {
      const success = await lectureService.postRequestQuiz(id);
      return success;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  useEffect(() => {
    if (lectureId) {
      getLectureContent(lectureId);
    }
  }, [lectureId, getLectureContent]);

  return {
    lectureData,
    isLoading,
    error,
    getLectureContent,
    postRequestQuiz,
  };
}
