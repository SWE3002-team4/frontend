export interface UserProfile {
  id: string;
  email: string;
  name: string;
  profileImageUrl?: string;
}

export interface AuthResponse {
  user: UserProfile;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}
