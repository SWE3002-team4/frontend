import { LectureDetail, UploadDocumentResponse, DocumentDetailResponse } from '../types/subject';
import { CreateQuizResponseDto } from '../types/quiz';
import { apiClient } from './apiClient';

// MOCK_LECTURE_DETAILS 제거됨

class LectureService {
  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async uploadDocument(subjectId: string, file: File, title?: string): Promise<UploadDocumentResponse> {
    const formData = new FormData();
    formData.append('file', file);
    if (title) {
      formData.append('title', title);
    }

    const response = await apiClient.post<UploadDocumentResponse>(
      `/subjects/${subjectId}/documents/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }

  async analyzeDocument(documentId: string): Promise<DocumentDetailResponse> {
    const response = await apiClient.post<DocumentDetailResponse>(`/documents/${documentId}/analyze`);
    return response.data;
  }

  async getLectureDetail(id: string): Promise<LectureDetail> {
    console.log(`[LectureService] getLectureDetail called for ID: ${id}`);
    
    try {
      const response = await apiClient.get<DocumentDetailResponse>(`/documents/${id}`);
      const doc = response.data;
      
      // Convert to LectureDetail format expected by frontend
      return {
        materialId: doc.documentId,
        title: doc.title || '강의 자료',
        pdfUrl: doc.fileUrl,
        summaryText: doc.overallSummary || '요약본이 없습니다.',
        strongKeywords: (doc.keywords || []).filter(k => k.importanceScore >= 0.8).map(k => k.name),
        weakKeywords: (doc.keywords || []).filter(k => k.importanceScore < 0.8).map(k => k.name),
        masteryScore: 0, // Fallback as Document API doesn't provide this yet
        coverageScore: 0,
      };
    } catch (error) {
      console.warn('Failed to fetch from API:', error);

      // Default return for newly created/other lectures
      const defaultLecture: LectureDetail = {
        materialId: id,
        title: `${id}강: 신규 학습자료 및 분석`,
        pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        summaryText: `본 단원에 대한 요약 분석 리포트가 준비 중입니다. \nPDF 파일을 업로드하여 AI 분석을 요청해 주세요.`,
        strongKeywords: [],
        weakKeywords: [],
        masteryScore: 0,
        coverageScore: 0,
      };

      return defaultLecture;
    }
  }

  async postRequestQuiz(id: string): Promise<string | null> {
    console.log(`[LectureService] postRequestQuiz called for document ID: ${id}`);
    try {
      const response = await apiClient.post<CreateQuizResponseDto>(`/documents/${id}/quiz`, {
        quizProblemCount: 15,
      });
      return response.data.quizId;
    } catch (error) {
      console.error('[LectureService] Failed to create quiz:', error);
      return null;
    }
  }
}

export const lectureService = new LectureService();
