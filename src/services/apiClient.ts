import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('accessToken');
  }
  return null;
};

export const getRefreshToken = () => {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('refreshToken');
  }
  return null;
};

export const setTokens = (accessToken: string, refreshToken: string) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
  }
};

export const clearTokens = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
  }
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: 매 요청마다 헤더에 Access Token 주입
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

// Response Interceptor: 401 에러 발생 시 Refresh Token으로 자동 갱신 후 재시도
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && originalRequest && originalRequest.url !== '/auth/refresh') {
      const refreshToken = getRefreshToken();
      
      if (refreshToken && !originalRequest._retry) {
        if (!isRefreshing) {
          isRefreshing = true;
          originalRequest._retry = true;

          try {
            // 인터셉터 무한 루프를 막기 위해 새 axios 인스턴스로 요청
            const refreshRes = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
            const { accessToken, refreshToken: newRefreshToken } = refreshRes.data;

            setTokens(accessToken, newRefreshToken);
            isRefreshing = false;
            onRefreshed(accessToken);

            // 실패했던 원래 요청의 헤더를 새 토큰으로 업데이트 후 재시도
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return apiClient(originalRequest);
            
          } catch (refreshError) {
            clearTokens();
            isRefreshing = false;
            return Promise.reject(new Error('Session expired'));
          }
        }

        // 갱신 중일 때는 대기열에 넣었다가 갱신 완료 후 재시도
        return new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          });
        });
      } else {
        clearTokens();
      }
    }

    return Promise.reject(error);
  }
);
