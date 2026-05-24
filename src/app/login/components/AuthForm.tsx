"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../hooks/useAuth';

interface AuthFormProps {
  isLoginMode: boolean;
}

export function AuthForm({ isLoginMode }: AuthFormProps) {
  const router = useRouter();
  const { login, register, isLoading, error } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const validate = (): boolean => {
    setValidationError('');
    if (!email || !password) {
      setValidationError('이메일과 비밀번호를 입력해주세요.');
      return false;
    }
    if (!isLoginMode && !name) {
      setValidationError('이름을 입력해주세요.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError('유효한 이메일 형식이 아닙니다.');
      return false;
    }
    return true;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    let success = false;
    if (isLoginMode) {
      success = await login({ email, password });
    } else {
      success = await register({ name, email, password });
    }

    if (success) {
      router.push('/');
    }
  };

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
      
      {!isLoginMode && (
         <div className="space-y-1">
           <label className="block text-sm font-medium text-gray-700">이름</label>
           <input 
             type="text" 
             placeholder="홍길동"
             value={name}
             onChange={(e) => setName(e.target.value)}
             className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
           />
         </div>
      )}

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">아이디</label>
        <input 
          type="text" 
          placeholder="user@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">비밀번호</label>
        <input 
          type="password" 
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Error Messages */}
      {(validationError || error) && (
        <div className="text-red-500 text-sm font-medium pt-1">
          {validationError || error}
        </div>
      )}

      <div className="pt-2">
         <button 
           type="submit"
           disabled={isLoading}
           className="w-full block text-center py-2 px-4 rounded text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
         >
           {isLoading ? '처리 중...' : (isLoginMode ? '로그인' : '회원가입')}
         </button>
      </div>
    </form>
  );
}
