"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#09090b] text-zinc-50 font-sans selection:bg-indigo-500/30 p-6 relative overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Back to Home Link (임시 네비게이션용) */}
      <div className="absolute top-8 left-8 z-20">
         <Link href="/" className="text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-2 text-[14px] font-medium group">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            홈으로 이동
         </Link>
      </div>

      <div className="relative w-full max-w-[440px] bg-[#0c0c0e]/80 border border-white/[0.08] rounded-[24px] p-10 backdrop-blur-3xl shadow-[0_0_80px_rgba(0,0,0,0.8)] shadow-indigo-900/10 z-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
        
        {/* Logo Area */}
        <div className="flex flex-col items-center mb-10">
           <div className="text-[28px] font-light tracking-tight text-white flex items-center gap-2.5 mb-2.5">
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">Sudo</span>
              <span className="opacity-90">Campus</span>
           </div>
           <p className="text-zinc-400 text-[13px] tracking-wide">AI 맞춤형 학습의 시작</p>
        </div>

        {/* Auth Toggle Tabs */}
        <div className="flex p-1 bg-black/40 rounded-xl mb-8 border border-white/[0.05]">
           <button 
             onClick={() => setIsLogin(true)}
             className={`flex-1 py-3 text-[14px] font-semibold rounded-lg transition-all duration-300 ${isLogin ? 'bg-white/[0.1] text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
           >
             로그인
           </button>
           <button 
             onClick={() => setIsLogin(false)}
             className={`flex-1 py-3 text-[14px] font-semibold rounded-lg transition-all duration-300 ${!isLogin ? 'bg-white/[0.1] text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
           >
             회원가입
           </button>
        </div>

        {/* Auth Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          
          <div className={`space-y-4 overflow-hidden transition-all ${isLogin ? 'max-h-0 opacity-0' : 'max-h-[100px] opacity-100'}`}>
             <div className="space-y-1.5">
               <label className="block text-[12px] font-semibold tracking-wider uppercase text-zinc-400 pl-1">이름</label>
               <input 
                 type="text" 
                 placeholder="홍길동"
                 className="w-full px-4 py-3.5 bg-black/60 border border-white/[0.08] rounded-xl text-white text-[15px] placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/[0.02] focus:ring-1 focus:ring-indigo-500/50 transition-all duration-200"
               />
             </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[12px] font-semibold tracking-wider uppercase text-zinc-400 pl-1">아이디</label>
            <input 
              type="text" 
              placeholder="user@example.com"
              className="w-full px-4 py-3.5 bg-black/60 border border-white/[0.08] rounded-xl text-white text-[15px] placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/[0.02] focus:ring-1 focus:ring-indigo-500/50 transition-all duration-200"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[12px] font-semibold tracking-wider uppercase text-zinc-400 pl-1">비밀번호</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-3.5 bg-black/60 border border-white/[0.08] rounded-xl text-white text-[15px] placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/[0.02] focus:ring-1 focus:ring-indigo-500/50 transition-all duration-200"
            />
          </div>

          <div className="pt-6">
             {/* 현재 데모용으론 어떤 버튼을 누르든 메인으로 이동합니다 */}
             <Link 
               href="/"
               className="w-full flex items-center justify-center py-4 px-4 rounded-xl text-[16px] font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
             >
               {isLogin ? '로그인' : '회원가입 완료'}
             </Link>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
           <div className="flex-1 h-px bg-white/[0.08]" />
           <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">or continue with</span>
           <div className="flex-1 h-px bg-white/[0.08]" />
        </div>

        {/* Google Auth Button */}
        <button 
          type="button"
          className="w-full flex items-center justify-center gap-3 py-4 px-4 rounded-xl border border-white/[0.15] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.3] transition-all duration-300 text-zinc-200 font-semibold active:scale-[0.98]"
        >
           {/* Google SVG Icon */}
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
              <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.409 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/>
              <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.806l-4.04 3.127C3.204 21.302 7.276 24 12 24c3.068 0 5.86-1.009 7.925-2.885l-3.885-3.102Z"/>
              <path fill="#4A90E2" d="M19.925 21.115c2.24-2.094 3.575-5.228 3.575-8.815 0-.777-.07-1.522-.191-2.227h-11.31v4.418h6.467c-.286 1.436-1.09 2.654-2.262 3.497l3.721 3.127Z"/>
              <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"/>
           </svg>
           구글 계정으로 로그인
        </button>

      </div>
    </div>
  );
}
