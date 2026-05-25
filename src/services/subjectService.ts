import { apiClient } from './apiClient';
import { Subject, CreateSubjectDto, DashboardInfo, SubjectResponse, UpdateSubjectRequest } from '../types/subject';

// In-memory store for dashboard info per subject (since Dashboard API isn't provided yet)
const MOCK_DASHBOARDS: Record<string, DashboardInfo> = {
  '1': {
    subjectId: '1',
    subjectName: '소프트웨어공학 개론',
    mastery: 89,
    coverage: 65,
    strongKeywords: ['생명주기', '요구사항', 'UML', '디자인패턴'],
    weakKeywords: ['TDD', '리팩토링', '지속적 통합'],
    lectures: [
      { id: '1', title: '01강: 소프트웨어 생명주기 모델' },
      { id: '2', title: '02강: 요구사항 분석 및 설계' },
      { id: '3', title: '03강: UML 다이어그램 활용' },
      { id: '4', title: '04강: 디자인 패턴 맛보기' },
    ],
    history: [
      { id: '101', name: '1회 소프트웨어공학 모의고사', score: '85/100' },
      { id: '102', name: '2회 소프트웨어공학 모의고사', score: '90/100' },
    ],
  },
  '2': {
    subjectId: '2',
    subjectName: '컴파일러 원리',
    mastery: 20,
    coverage: 10,
    strongKeywords: ['어휘 분석', '정규표현식'],
    weakKeywords: ['구문 분석', 'LL(1) 파싱', 'LALR 파서', '코드 생성'],
    lectures: [
      { id: '1', title: '01강: 컴파일러 개요 및 어휘 분석' },
      { id: '2', title: '02강: Context-Free Grammar와 파싱' },
    ],
    history: [
      { id: '201', name: '1회 컴파일러 모의고사', score: '35/100' },
    ],
  },
  '3': {
    subjectId: '3',
    subjectName: '데이터베이스 시스템 설계',
    mastery: 65,
    coverage: 50,
    strongKeywords: ['관계형 모델', 'SQL 질의', '정규화'],
    weakKeywords: ['트랜잭션 ACID', '인덱싱 B-Tree', '동시성 제어'],
    lectures: [
      { id: '1', title: '01강: 관계형 데이터 모델' },
      { id: '2', title: '02강: SQL 및 고급 질의문' },
      { id: '3', title: '03강: 스키마 정규화 이론' },
    ],
    history: [
      { id: '301', name: '1회 데이터베이스 모의고사', score: '60/100' },
      { id: '302', name: '2회 데이터베이스 모의고사', score: '75/100' },
    ],
  },
};

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

  async getSubjects(): Promise<Subject[]> {
    const response = await apiClient.get<SubjectResponse[]>('/subjects');
    return response.data.map(this.mapResponseToSubject);
  }

  async getSubjectDetail(id: string): Promise<Subject> {
    const response = await apiClient.get<SubjectResponse>(`/subjects/${id}`);
    return this.mapResponseToSubject(response.data);
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
    // If exist in mock DB, return copy.
    if (MOCK_DASHBOARDS[id]) {
      await this.delay(600);
      return { ...MOCK_DASHBOARDS[id] };
    }

    // 대시보드가 없으면 실제 Subject를 조회하여 과목명 세팅
    let subjectName = '미등록 과목';
    try {
      const subject = await this.getSubjectDetail(id);
      subjectName = subject.title;
    } catch (e) {
      console.warn('Failed to fetch subject details for dashboard', e);
    }

    const newDashboard: DashboardInfo = {
      subjectId: id,
      subjectName: subjectName,
      mastery: 0,
      coverage: 0,
      strongKeywords: [],
      weakKeywords: [],
      lectures: [],
      history: [],
    };

    MOCK_DASHBOARDS[id] = newDashboard;
    return newDashboard;
  }
}

export const subjectService = new SubjectService();
