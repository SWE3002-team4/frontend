import { useState } from 'react';
import { UserProfile, LoginCredentials, RegisterCredentials } from '../types/auth';
import { authService } from '../services/authService';

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = user !== null;

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.postLogin(credentials);
      setUser(response.user);
      console.log('[useAuth] Login successful. Session updated.');
      return true;
    } catch (err) {
      console.error(err);
      setError('로그인에 실패했습니다.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.postRegister(credentials);
      setUser(response.user);
      console.log('[useAuth] Registration successful. Session updated.');
      return true;
    } catch (err) {
      console.error(err);
      setError('회원가입에 실패했습니다.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const url = await authService.getGoogleAuthUrl();
      console.log('[useAuth] Redirecting to Google Auth URL:', url);
      // In a real application, you would redirect the user:
      // window.location.href = url;
    } catch (err) {
      console.error(err);
      setError('구글 로그인 진행 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    loginWithGoogle,
  };
}
