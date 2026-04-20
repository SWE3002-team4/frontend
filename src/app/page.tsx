import React from 'react';
import Link from 'next/link';

interface Subject {
  id: string; 
  title: string; 
  progress: number; 
  imageUrl: string;
}


const MOCK_SUBJECTS: Subject[] = [
  {
    id: '1',
    title: '소프트웨어공학 개론',
    progress: 89,
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    id: '2',
    title: '컴파일러 원리',
    progress: 20,
    imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    id: '3',
    title: '데이터베이스 시스템 설계',
    progress: 65,
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600&h=400',
  },
];

export default function Home() {
  return (
    <div className="flex-1 w-full bg-[#09090b] text-zinc-50 font-sans selection:bg-indigo-500/30">
      {/* 1. 상단 네비게이션 헤더 */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-6 md:px-12 py-5 mx-auto w-full border-b border-white/[0.05] bg-[#09090b]/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          {/* Logo */}
          <h1 className="text-2xl font-light tracking-tight text-white flex items-center gap-2">
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Sudo</span>
            <span className="opacity-90">Campus</span>
          </h1>
        </div>
        
        {/* 우측 프로필 및 로그아웃 버튼 */}
        <div className="flex items-center gap-4">
          <button 
            type="button" 
            className="h-10 w-10 flex items-center justify-center rounded-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-200"
            aria-label="사용자 프로필"
          >
            {/* User Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-300">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
          <Link 
            href="/login"
            className="px-4 py-2 text-sm font-medium text-zinc-300 border border-white/[0.08] rounded-lg hover:bg-white/[0.08] hover:text-white transition-all duration-200 hover:border-white/[0.15]"
          >
            로그아웃
          </Link>
        </div>
      </header>

      {/* 2. 메인 콘텐츠 영역 (과목 그리드) */}
      <main className="px-6 md:px-12 py-12 max-w-[1600px] mx-auto w-full">
        {/* 스케치 반영: 반응형 그리드 레이아웃 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
          
          {/* 사용자 등록 과목 카드 목록 */}
          {MOCK_SUBJECTS.map((subject) => (
            <Link 
              href={`/subject/${subject.id}`}
              key={subject.id}
              className="group relative flex flex-col rounded-[20px] border border-white/[0.08] bg-white/[0.02] overflow-hidden hover:border-white/[0.15] hover:bg-white/[0.04] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-indigo-500/10"
            >
              {/* 상단: 이미지 및 숙련도 */}
              <div className="relative h-56 w-full overflow-hidden bg-zinc-900">
                <img
                  src={subject.imageUrl}
                  alt={subject.title}
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                
                {/* 텍스트 가독성을 위한 그라데이션 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-transparent" />
                
                {/* 스케치 반영: 숙련도 텍스트 (우측 하단 배치) */}
                <div className="absolute bottom-4 right-5 z-10 flex flex-col items-end">
                  <span className="text-[11px] text-zinc-400 font-medium mb-0.5 tracking-wider">숙련도</span>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-tr from-indigo-400 to-cyan-300 font-mono tracking-tighter">
                      {subject.progress}
                    </span>
                    <span className="text-lg font-semibold text-cyan-300/80">%</span>
                  </div>
                </div>
              </div>
              
              {/* 하단: 과목 타이틀 */}
              <div className="p-5 flex-1 flex items-center border-t border-white/[0.05] bg-[#0c0c0e]">
                <h3 className="text-[17px] font-medium text-zinc-200 group-hover:text-white transition-colors line-clamp-2 leading-snug">
                  {subject.title}
                </h3>
              </div>
            </Link>
          ))}

          {/* 스케치 반영: 과목 추가 버튼 카드 */}
          <Link href="/new" className="group flex flex-col items-center justify-center min-h-[19rem] rounded-[20px] border-2 border-dashed border-white/[0.12] bg-transparent hover:border-indigo-500/50 hover:bg-indigo-500-[0.02] transition-all duration-300 cursor-pointer ease-out focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
            <div className="flex flex-col items-center gap-5 text-zinc-500 group-hover:text-indigo-400 transition-colors duration-300">
              <div className="p-4 rounded-full bg-white/[0.02] group-hover:bg-indigo-500/10 group-hover:scale-110 transition-all duration-300">
                {/* Plus Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/><path d="M12 5v14"/>
                </svg>
              </div>
              <span className="text-[17px] font-medium tracking-wide">과목 추가</span>
            </div>
          </Link>

        </div>
      </main>
    </div>
  );
}
