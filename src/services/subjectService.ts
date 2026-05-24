import { Subject, CreateSubjectDto } from '../types/subject';

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

class SubjectService {
  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getSubjects(): Promise<Subject[]> {
    console.log('[SubjectService] getSubjects called');
    await this.delay(500);
    // TODO: Replace with real fetch call when API is ready
    return [...MOCK_SUBJECTS];
  }

  async postSubject(dto: CreateSubjectDto): Promise<Subject> {
    console.log('[SubjectService] postSubject called with:', dto.title, dto.imageFile?.name);
    await this.delay(700);

    // Mock implementation of creating a new subject
    const newSubject: Subject = {
      id: Math.random().toString(36).substring(7),
      title: dto.title,
      progress: 0,
      // If a real image was uploaded, we would use the CDN URL. 
      // For mock, use a placeholder if no file, or a generic placeholder if there is a file.
      imageUrl: dto.imageFile 
        ? URL.createObjectURL(dto.imageFile) 
        : 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?auto=format&fit=crop&q=80&w=600&h=400',
    };

    MOCK_SUBJECTS.push(newSubject);
    return newSubject;
  }
}

export const subjectService = new SubjectService();
