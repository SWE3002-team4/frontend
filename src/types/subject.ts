export interface Subject {
  id: string;
  title: string;
  progress: number;
  imageUrl: string;
}

export interface CreateSubjectDto {
  title: string;
  imageFile: File | null;
}
