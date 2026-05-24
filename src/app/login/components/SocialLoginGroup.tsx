"use client";

import React from 'react';
import { useAuth } from '../../../hooks/useAuth';

export function SocialLoginGroup() {
  const { loginWithGoogle, isLoading } = useAuth();

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
  };

  return (
    <button 
      type="button"
      onClick={handleGoogleLogin}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded border border-gray-300 bg-white hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
        <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.409 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/>
        <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.806l-4.04 3.127C3.204 21.302 7.276 24 12 24c3.068 0 5.86-1.009 7.925-2.885l-3.885-3.102Z"/>
        <path fill="#4A90E2" d="M19.925 21.115c2.24-2.094 3.575-5.228 3.575-8.815 0-.777-.07-1.522-.191-2.227h-11.31v4.418h6.467c-.286 1.436-1.09 2.654-2.262 3.497l3.721 3.127Z"/>
        <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"/>
      </svg>
      구글로 계정 로그인
    </button>
  );
}
