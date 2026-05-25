import { AuthResponse, UserProfile, GoogleLoginRequest, LoginCredentials, RegisterCredentials } from '../types/auth';
import { apiClient, setTokens, clearTokens } from './apiClient';

class AuthService {
  // --- 기존 일반 로그인 인터페이스 복구 및 연동 ---
  async postLogin(credentials: LoginCredentials): Promise<AuthResponse> {
    console.log('[AuthService] postLogin request:', credentials);
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      const data = response.data;
      if (data.accessToken && data.refreshToken) {
        setTokens(data.accessToken, data.refreshToken);
      }
      return data;
    } catch (error) {
      throw new Error('로그인에 실패했습니다.');
    }
  }

  // --- 기존 일반 회원가입 인터페이스 복구 및 연동 ---
  async postRegister(credentials: RegisterCredentials): Promise<AuthResponse> {
    console.log('[AuthService] postRegister request:', credentials);
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register', credentials);
      const data = response.data;
      if (data.accessToken && data.refreshToken) {
        setTokens(data.accessToken, data.refreshToken);
      }
      return data;
    } catch (error) {
      throw new Error('회원가입에 실패했습니다.');
    }
  }

  // --- 신규 구글 로그인 인터페이스 ---
  async loginWithGoogle(idToken: string): Promise<AuthResponse> {
    const requestBody: GoogleLoginRequest = { idToken };
    
    // 백엔드 디버깅용 로그 (개발자 도구 콘솔에서 확인 가능)
    console.log('======== [백엔드 디버깅용 curl 명령어] ========');
    console.log(`curl -X POST ${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google \\`);
    console.log(`  -H "Content-Type: application/json" \\`);
    console.log(`  -d '{"idToken": "${idToken}"}'`);
    console.log('=============================================');

    try {
      const response = await apiClient.post<AuthResponse>('/auth/google', requestBody);
      const data = response.data;
      if (data.accessToken && data.refreshToken) {
        setTokens(data.accessToken, data.refreshToken);
      }
      return data;
    } catch (error) {
      throw new Error('Google login failed');
    }
  }

  // --- 공통 인터페이스 ---
  async getCurrentUser(): Promise<UserProfile> {
    try {
      const response = await apiClient.get<UserProfile>('/auth/me');
      return response.data;
    } catch (error) {
      throw new Error('Failed to get current user');
    }
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout failed on server, clearing local tokens anyway', error);
    } finally {
      clearTokens();
    }
  }

  async getGoogleAuthUrl(): Promise<string> {
    return 'https://accounts.google.com/o/oauth2/v2/auth?mock=true';
  }
}

export const authService = new AuthService();
