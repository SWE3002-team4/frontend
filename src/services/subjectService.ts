import { apiClient } from './apiClient';
import { Subject, CreateSubjectDto, DashboardInfo, SubjectResponse, UpdateSubjectRequest, DocumentMetadataResponse, Lecture } from '../types/subject';
import { SubjectLearningStatusResponse } from '../types/learningStatus';
import { examService } from './examService';
import { MockExamListItem } from '../types/exam';

// MOCK_DASHBOARDS 제거됨

class SubjectService {
  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // 내부 유틸: 백엔드의 SubjectResponse를 프론트엔드의 Subject 모델로 변환
  private mapResponseToSubject(item: SubjectResponse): Subject {
    let finalImageUrl = 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?auto=format&fit=crop&q=80&w=600&h=400';
    
    if (item.thumbnailUrl) {
      if (item.thumbnailUrl.startsWith('/')) {
        finalImageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.thumbnailUrl}`;
      } else {
        finalImageUrl = item.thumbnailUrl;
      }
    }

    return {
      id: item.id,
      title: item.name,
      progress: 0, // 백엔드에서 아직 progress(달성도)를 반환하지 않으므로 임시로 0 처리
      imageUrl: finalImageUrl,
    };
  }

  async getSubjectLearningStatus(id: string): Promise<SubjectLearningStatusResponse> {
    const response = await apiClient.get<SubjectLearningStatusResponse>(`/subjects/${id}/learning-status`);
    return response.data;
  }

  async getSubjects(): Promise<Subject[]> {
    const response = await apiClient.get<SubjectResponse[]>('/subjects');
    const subjects = response.data.map(item => this.mapResponseToSubject(item));
    
    // Fetch learning status for all subjects
    const subjectsWithProgress = await Promise.all(
      subjects.map(async (subject) => {
        try {
          const statusRes = await this.getSubjectLearningStatus(subject.id);
          subject.progress = Math.round(statusRes.mastery * 100);
        } catch (e) {
          console.warn(`Failed to fetch learning status for subject ${subject.id}`, e);
        }
        return subject;
      })
    );
    return subjectsWithProgress;
  }

  async getSubjectDetail(id: string): Promise<Subject> {
    const response = await apiClient.get<SubjectResponse>(`/subjects/${id}`);
    const subject = this.mapResponseToSubject(response.data);
    try {
      const statusRes = await this.getSubjectLearningStatus(id);
      subject.progress = Math.round(statusRes.mastery * 100);
    } catch (e) {
      console.warn(`Failed to fetch learning status for subject ${id}`, e);
    }
    return subject;
  }

  async postSubject(dto: CreateSubjectDto): Promise<Subject> {
    let response;
    
    // 파일이 있는 경우 multipart/form-data로 전송
    if (dto.imageFile) {
      const formData = new FormData();
      formData.append('name', dto.title);
      if (dto.description) {
        formData.append('description', dto.description);
      }
      formData.append('thumbnail', dto.imageFile);
      
      response = await apiClient.post<SubjectResponse>('/subjects', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      // 파일이 없는 경우 application/json으로 전송
      const body = {
        name: dto.title,
        description: dto.description || null,
      };
      response = await apiClient.post<SubjectResponse>('/subjects', body);
    }
    
    return this.mapResponseToSubject(response.data);
  }

  async updateSubject(id: string, data: UpdateSubjectRequest): Promise<Subject> {
    const response = await apiClient.patch<SubjectResponse>(`/subjects/${id}`, data);
    return this.mapResponseToSubject(response.data);
  }

  async deleteSubject(id: string): Promise<void> {
    await apiClient.delete(`/subjects/${id}`);
  }

  async getDashboardInfo(id: string): Promise<DashboardInfo> {
    // 1. Fetch Subject Name
    let subjectName = '미등록 과목';
    try {
      const subject = await this.getSubjectDetail(id);
      subjectName = subject.title;
    } catch (e) {
      console.warn('Failed to fetch subject details for dashboard', e);
    }

    // 2. Fetch Document List (Lectures)
    let lectures: Lecture[] = [];
    try {
      const response = await apiClient.get<DocumentMetadataResponse[]>(`/subjects/${id}/documents`);
      lectures = response.data.map(doc => ({
        id: doc.documentId,
        title: doc.title || doc.originalFileName || '제목 없음',
      }));
    } catch (e) {
      console.warn('Failed to fetch documents for dashboard', e);
    }

    // 3. Fetch Learning Status
    let statusData: SubjectLearningStatusResponse | null = null;
    try {
      statusData = await this.getSubjectLearningStatus(id);
    } catch (e) {
      console.warn('Failed to fetch learning status for dashboard', e);
    }

    // 4. Fetch Mock Exams History
    let mockExams: MockExamListItem[] = [];
    try {
      mockExams = await examService.getSubjectMockExams(id);
    } catch (e) {
      console.warn('Failed to fetch mock exams for dashboard', e);
    }

    // 5. Fill Dashboard Metrics
    return {
      subjectId: id,
      subjectName: subjectName,
      mastery: statusData ? Math.round(statusData.mastery * 100) : 0,
      coverage: statusData ? Math.round(statusData.coverage * 100) : 0,
      strongKeywords: statusData ? statusData.strongKeywords.map(k => k.name) : [],
      weakKeywords: statusData ? statusData.weakKeywords.map(k => k.name) : [],
      lectures: lectures,
      history: mockExams,
    };
  }
}

export const subjectService = new SubjectService();
