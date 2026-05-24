import { AuthResponse, LoginCredentials, RegisterCredentials } from '../types/auth';

class AuthService {
  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async postLogin(credentials: LoginCredentials): Promise<AuthResponse> {
    console.log('[AuthService] postLogin request:', credentials);
    await this.delay(500); 
    
    // TODO: Replace with real fetch call when API is ready
    return {
      user: {
        id: 'user-1',
        email: credentials.email,
        name: '홍길동',
      },
      token: 'mock-jwt-token-12345',
    };
  }

  async postRegister(credentials: RegisterCredentials): Promise<AuthResponse> {
    console.log('[AuthService] postRegister request:', credentials);
    await this.delay(500);
    
    // TODO: Replace with real fetch call when API is ready
    return {
      user: {
        id: 'user-new',
        email: credentials.email,
        name: credentials.name,
      },
      token: 'mock-jwt-token-new',
    };
  }

  async getGoogleAuthUrl(): Promise<string> {
    console.log('[AuthService] getting google auth URL');
    await this.delay(200);
    // TODO: Fetch Google OAuth redirect URL from backend
    return 'https://accounts.google.com/o/oauth2/v2/auth?mock=true';
  }
}

export const authService = new AuthService();
