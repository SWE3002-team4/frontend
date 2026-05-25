export interface UserProfile {
  id: string;
  email: string;
  name: string;
  profileImageUrl?: string;
  role?: "USER" | "ADMIN";
  status?: "ACTIVE" | "SUSPENDED" | "DELETED";
}

export interface AuthResponse {
  user: UserProfile;
  token?: string; // For backward compatibility if needed anywhere
  accessToken?: string;
  refreshToken?: string;
}

export interface GoogleLoginRequest {
  idToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
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

export interface UpdateUserRequest {
  name?: string;
  profileImageUrl?: string;
}
