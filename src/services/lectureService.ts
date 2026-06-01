import { LectureDetail, UploadDocumentResponse, DocumentDetailResponse } from '../types/subject';
import { apiClient } from './apiClient';

// Persisted Mock lecture details map
const MOCK_LECTURE_DETAILS: Record<string, LectureDetail> = {
  '1': {
    materialId: '1',
    title: '01강: 소프트웨어 생명주기 모델',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    summaryText: `[소프트웨어 생명주기(SDLC) 요약 리포트]

1. 소프트웨어 생명주기 개요
- 소프트웨어 개발의 계획수립, 분석, 설계, 구현, 테스트, 유지보수에 이르는 전 과정을 체계화한 모델입니다.

2. 대표적 소프트웨어 생명주기 모델
- 폭포수 모델 (Waterfall Model): 가장 오래되고 널리 쓰인 고전적 기법으로, 계획-분석-설계-구현-테스트 순으로 순차적인 하향식 흐름을 가집니다. 각 단계가 명확히 끝나야 다음 단계로 진행되므로 신뢰성은 높으나, 후반 요구사항 변경 대응이 극도로 취약합니다.
- 프로토타입 모델 (Prototyping Model): 사용자의 요구를 수렴하기 위해 핵심 기능으로 구성된 간이 시제품(Prototype)을 우선 제작하여 피드백을 반영하며 정교화하는 모델입니다. 요구 분석 오류를 최소화합니다.
- 나선형 모델 (Spiral Model): 계획 수립 - 위험 분석 - 개발 및 검증 - 고객 평가라는 4개 활동 단위를 반복적으로 수행하면서 소프트웨어를 점진적으로 완성해 나가는 방식입니다. 대규모 위험 관리에 유리하나 비용이 많이 듭니다.
- 애자일 방법론 (Agile): 변화를 수용하고 신속한 피드백 루프를 반복하여 작동하는 소프웨어를 고객에게 짧은 단위(Sprint)로 자주 릴리스하는 기법입니다.`,
    strongKeywords: ['생명주기', 'SDLC', '폭포수 모델'],
    weakKeywords: ['위험분석', '나선형 모델'],
    masteryScore: 50,
    coverageScore: 20,
  },
  '2': {
    materialId: '2',
    title: '02강: 요구사항 분석 및 설계',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    summaryText: `[요구사항 분석 및 설계 요약 리포트]

1. 요구사항 공학 개요
- 시스템이 제공해야 할 서비스와 지켜야 할 제약조건을 정의하고 문서화하며 타당성을 검증하는 체계적 과정입니다.

2. 요구사항의 분류
- 기능 요구사항 (Functional): 시스템이 제공해야 할 직접적인 행위, 입출력 구조, 연산 절차 등을 뜻합니다. (예: "로그인 버튼을 클릭하면 세션을 검증한다.")
- 비기능 요구사항 (Non-Functional): 시스템의 품질 특성에 관한 제약 조건입니다. 성능, 신뢰성, 가용성, 유지보수성, 보안성 등이 포함됩니다. (예: "동시 접속자 1000명 시 응답 속도는 2초 이내여야 한다.")

3. 요구사항 명세서 (SRS)
- 최종 조율된 모든 요구사항을 완결성 있게 명문화한 문서로, 소프트웨어 개발 계약의 최종 기준이 되며 후속 테스트 설계의 기초가 됩니다.`,
    strongKeywords: ['기능 요구사항', 'SRS'],
    weakKeywords: ['비기능 요구사항', '요구사항 도출'],
    masteryScore: 80,
    coverageScore: 70,
  },
  '3': {
    materialId: '3',
    title: '03강: UML 다이어그램 활용',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    summaryText: `[UML 다이어그램 활용 요약 리포트]

1. UML(Unified Modeling Language) 개요
- 소프트웨어 시스템의 산출물을 시각화, 명세화, 구축, 문서화하는 표준 통합 모델링 언어입니다.

2. 구조적 다이어그램 (Static)
- 클래스 다이어그램: 클래스의 내부 구조(속성, 메서드)와 정적 클래스 간의 다중성, 관계(연관, 의존, 일반화, 실체화)를 그리는 핵심 도구입니다.

3. 행위적 다이어그램 (Dynamic)
- 유스케이스 다이어그램: 사용자 관점에서 시스템의 기능적 시나리오를 설명합니다.
- 시퀀스 다이어그램: 상호작용하는 객체들 간의 시간적 흐름에 따른 메시지 송수신 흐름을 순차적으로 렌더링합니다.`,
    strongKeywords: ['클래스 다이어그램', 'UML 표준'],
    weakKeywords: ['시퀀스 다이어그램', '의존 vs 연관'],
    masteryScore: 65,
    coverageScore: 50,
  },
};

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
      console.warn('Failed to fetch from API, falling back to mock:', error);
      await this.delay(500);

      // If exists, return a clone
      if (MOCK_LECTURE_DETAILS[id]) {
        return { ...MOCK_LECTURE_DETAILS[id] };
      }

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

      MOCK_LECTURE_DETAILS[id] = defaultLecture;
      return defaultLecture;
    }
  }

  async postRequestQuiz(id: string): Promise<boolean> {
    console.log(`[LectureService] postRequestQuiz called for lecture ID: ${id}`);
    await this.delay(600);
    // Mimics backend quiz generation
    return true;
  }
}

export const lectureService = new LectureService();
