import React from 'react';
import Link from 'next/link';

export default function AddSubjectPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#09090b] text-zinc-50 font-sans selection:bg-indigo-500/30 p-6 relative overflow-hidden">
      
      {/* Background ambient light effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Form Container */}
      <div className="relative w-full max-w-md bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
        
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-zinc-400 hover:text-white transition-colors mb-8 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 group-hover:-translate-x-1 transition-transform">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          뒤로 가기
        </Link>

        {/* Title */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white tracking-tight flex items-center gap-2">
            새로운 과목 추가
            <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
          </h2>
          <p className="text-[15px] text-zinc-400 mt-2 leading-relaxed">
            학습할 새로운 과정을 등록하세요. <br/>
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          
          {/* Subject Name Input */}
          <div className="space-y-2">
            <label htmlFor="subjectName" className="block text-[13px] font-semibold text-zinc-300 uppercase tracking-wide">
              과목명
            </label>
            <input 
              type="text" 
              id="subjectName"
              placeholder="예: 클라우드 컴퓨팅 기초"
              className="w-full px-4 py-3.5 bg-black/40 border border-white/[0.08] rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-200"
            />
          </div>

          {/* Image Upload Area */}
          <div className="space-y-2">
            <label className="block text-[13px] font-semibold text-zinc-300 uppercase tracking-wide">
              대표 이미지
            </label>
            <div className="mt-1 flex justify-center px-6 py-8 border-2 border-white/[0.08] border-dashed rounded-xl hover:border-indigo-500/50 hover:bg-indigo-500/[0.02] transition-all duration-300 cursor-pointer group">
              <div className="space-y-3 text-center flex flex-col items-center">
                <div className="p-3 rounded-full bg-white/[0.02] group-hover:bg-indigo-500/10 group-hover:scale-110 transition-all duration-300">
                  <svg className="h-8 w-8 text-zinc-400 group-hover:text-indigo-400 transition-colors" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4h-12m12-12l-10-10-10 10m-8-10v.01M28 8v4a4 4 0 004 4h4m-4-8a3 3 0 013-3h13.5A1.5 1.5 0 0148 6.5v15a1.5 1.5 0 01-1.5 1.5H35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="flex flex-col text-sm text-zinc-400 gap-1.5 mt-2">
                  <span className="relative cursor-pointer font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                    파일 업로드 (클릭)
                  </span>
                  <span>또는 이미지를 여기로 드래그하세요</span>
                </div>
                <p className="text-[12px] text-zinc-500 mt-2">
                  PNG, JPG, GIF (최대 10MB)
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button 
              type="button" 
              className="w-full flex justify-center py-4 px-4 rounded-xl text-[15px] font-semibold text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-[#09090b] transition-all duration-300 shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
            >
              새로운 과목 생성하기
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
