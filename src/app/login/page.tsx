"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900 font-sans p-6">
      
      {/* Back to Home Link */}
      <div className="absolute top-4 left-4 z-20">
         <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1 text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            홈으로 이동
         </Link>
      </div>

      <div className="w-full max-w-md bg-white border border-gray-200 rounded p-6 shadow-sm z-10">
        
        {/* Logo Area */}
        <div className="text-center mb-4">
           <h1 className="text-2xl font-bold text-gray-800 mb-1">
              SudoCampus
           </h1>
           <p className="text-gray-500 text-sm">AI 통합 학습 플랫폼</p>
        </div>

        {/* Auth Toggle Tabs */}
        <ul className="flex list-none p-0 m-0 mb-4 border-b border-gray-200">
           <li className="flex-1 text-center">
             <button 
               onClick={() => setIsLogin(true)}
               className={`w-full py-2 text-sm font-semibold transition-colors border-b-2 ${isLogin ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
             >
               로그인
             </button>
           </li>
           <li className="flex-1 text-center">
             <button 
               onClick={() => setIsLogin(false)}
               className={`w-full py-2 text-sm font-semibold transition-colors border-b-2 ${!isLogin ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
             >
               회원가입
             </button>
           </li>
        </ul>

        {/* Auth Form */}
        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          
          {!isLogin && (
             <div className="space-y-1">
               <label className="block text-sm font-medium text-gray-700">이름</label>
               <input 
                 type="text" 
                 placeholder="홍길동"
                 className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
               />
             </div>
          )}

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">아이디</label>
            <input 
              type="text" 
              placeholder="user@example.com"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">비밀번호</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="pt-2">
             <Link 
               href="/"
               className="block w-full text-center py-2 px-4 rounded text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
             >
               {isLogin ? '로그인' : '회원가입'}
             </Link>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
           <hr className="flex-1 border-gray-200" />
           <span className="text-xs text-gray-500 uppercase">or</span>
           <hr className="flex-1 border-gray-200" />
        </div>

        {/* Google Auth Button */}
        <button 
          type="button"
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded border border-gray-300 bg-white hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm"
        >
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
              <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.409 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/>
              <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.806l-4.04 3.127C3.204 21.302 7.276 24 12 24c3.068 0 5.86-1.009 7.925-2.885l-3.885-3.102Z"/>
              <path fill="#4A90E2" d="M19.925 21.115c2.24-2.094 3.575-5.228 3.575-8.815 0-.777-.07-1.522-.191-2.227h-11.31v4.418h6.467c-.286 1.436-1.09 2.654-2.262 3.497l3.721 3.127Z"/>
              <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"/>
           </svg>
           구글로 계정 로그인
        </button>

      </div>
    </div>
  );
}
