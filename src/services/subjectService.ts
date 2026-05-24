import { Subject, CreateSubjectDto, DashboardInfo } from '../types/subject';

// Mock data initialized here so it persists during the session
let MOCK_SUBJECTS: Subject[] = [
  {
    id: '1',
    title: '소프트웨어공학 개론',
    progress: 89,
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    id: '2',
    title: '컴파일러 원리',
    progress: 20,
    imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    id: '3',
    title: '데이터베이스 시스템 설계',
    progress: 65,
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600&h=400',
  },
];

// In-memory store for dashboard info per subject
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

  async getSubjects(): Promise<Subject[]> {
    console.log('[SubjectService] getSubjects called');
    await this.delay(500);
    return [...MOCK_SUBJECTS];
  }

  async postSubject(dto: CreateSubjectDto): Promise<Subject> {
    console.log('[SubjectService] postSubject called with:', dto.title, dto.imageFile?.name);
    await this.delay(700);

    const newId = Math.random().toString(36).substring(7);
    const newSubject: Subject = {
      id: newId,
      title: dto.title,
      progress: 0,
      imageUrl: dto.imageFile 
        ? URL.createObjectURL(dto.imageFile) 
        : 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?auto=format&fit=crop&q=80&w=600&h=400',
    };

    MOCK_SUBJECTS.push(newSubject);
    return newSubject;
  }

  async getDashboardInfo(id: string): Promise<DashboardInfo> {
    console.log(`[SubjectService] getDashboardInfo called for ID: ${id}`);
    await this.delay(600);

    // If exist in mock DB, return copy. Else dynamically generate empty dashboard.
    if (MOCK_DASHBOARDS[id]) {
      return { ...MOCK_DASHBOARDS[id] };
    }

    const foundSubject = MOCK_SUBJECTS.find((s) => s.id === id);
    const subjectName = foundSubject ? foundSubject.title : '미등록 과목';

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

    // Store it so subsequent reads persist state
    MOCK_DASHBOARDS[id] = newDashboard;
    return newDashboard;
  }
}

export const subjectService = new SubjectService();
