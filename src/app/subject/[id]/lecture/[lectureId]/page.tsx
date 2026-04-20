"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// --- MOCK DATA ---
const MOCK_DATA = {
  subjectName: '소프트웨어공학개론',
  lectures: [
    { id: '1', title: '01강' },
    { id: '2', title: '02강' },
    { id: '3', title: '03강' },
    { id: '4', title: '04강' },
  ],
  lectureDetails: {
    strongKeywords: ['생명주기', 'Agile'],
    weakKeywords: ['V모델', '나선형모델'],
    mastery: 50,
    coverage: 20,
  }
};

// -- Mini CircularProgress Component --
export const MiniCircularProgress = ({ title, percentage, color }: { title: string, percentage: number, color: string }) => {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-zinc-400 font-semibold tracking-wide uppercase text-[11px]">{title}</span>
      <div className="relative flex items-center justify-center w-[64px] h-[64px]">
        {/* SVG Chart */}
        <svg className="w-full h-full transform -rotate-90 drop-shadow-2xl">
          <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="5" fill="transparent" className="text-white/[0.1]"/>
          <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="5" fill="transparent" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className={`transition-all duration-1000 ease-out ${color}`} strokeLinecap="round"/>
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-[14px] font-bold text-white tracking-tighter">
            {percentage}<span className="text-[9px] text-white/50 ml-[1px]">%</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default function LectureDashboard() {
  const params = useParams();
  const lectureId = params?.lectureId || '1'; // 목업 매칭용

  // 상태 관리
  const [viewMode, setViewMode] = useState<'pdf' | 'summary'>('pdf');
  const [isFloatingOpen, setIsFloatingOpen] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-[#09090b] text-zinc-50 font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      
      {/* 0. Header */}
      <header className="flex-none px-8 py-5 border-b border-white/[0.05] bg-[#09090b]">
        <div className="flex items-center gap-4">
          <Link href="/subject/1" className="text-zinc-400 hover:text-white transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:-translate-x-1 transition-transform">
               <path d="m15 18-6-6 6-6"/>
             </svg>
          </Link>
          <h1 className="text-[22px] font-semibold tracking-tight text-white">{MOCK_DATA.subjectName}</h1>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* 1. Left Sidebar */}
        <aside className="w-[280px] flex-none border-r border-white/[0.05] bg-white/[0.01] flex flex-col z-10">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
             {MOCK_DATA.lectures.map((lecture) => {
                const isActive = lecture.id === lectureId;
                return (
                  <Link 
                    href={`/subject/1/lecture/${lecture.id}`}
                    key={lecture.id}
                    className={`block w-full py-4 px-6 border rounded-xl text-center font-medium text-[16px] transition-all duration-300 tracking-wide ${
                      isActive 
                        ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.15)] shadow-indigo-500/20' 
                        : 'bg-[#0c0c0e] border-white/[0.08] hover:border-white/[0.2] text-zinc-200 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    {lecture.title}
                  </Link>
                );
             })}
          </div>

          <div className="p-6 border-t border-white/[0.05] bg-[#09090b]">
             <button onClick={() => setIsUploadModalOpen(true)} className="w-full py-5 border-2 border-dashed border-white/[0.15] text-zinc-400 rounded-xl flex flex-col items-center justify-center hover:text-indigo-400 hover:border-indigo-400/50 hover:bg-indigo-500/[0.02] transition-colors group">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 group-hover:scale-110 transition-transform">
                   <path d="M5 12h14"/><path d="M12 5v14"/>
                </svg>
                <span className="text-[15px] font-medium">강의자료 추가</span>
             </button>
          </div>
        </aside>

        {/* 2. Main Viewer Area */}
        <main className="flex-1 relative bg-zinc-950 overflow-hidden flex">
           
           {/* 상단 뷰어 토글 브릿지 */}
           <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex bg-[#111113]/80 backdrop-blur-xl border border-white/[0.08] rounded-full p-1.5 shadow-2xl">
              <button 
                onClick={() => setViewMode('pdf')}
                className={`flex items-center gap-2 px-8 py-2.5 rounded-full text-[14px] font-medium transition-all duration-300 ${viewMode === 'pdf' ? 'bg-white/[0.08] text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                원본 PDF
              </button>
              <button 
                onClick={() => setViewMode('summary')}
                className={`flex items-center gap-2 px-8 py-2.5 rounded-full text-[14px] font-medium transition-all duration-300 ${viewMode === 'summary' ? 'bg-indigo-500/20 text-indigo-300 shadow-sm border border-indigo-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/><path d="M2 12h20"/><path d="m5 7-3 5 3 5"/><path d="m19 7 3 5-3 5"/></svg>
                AI 요약
              </button>
           </div>

           {/* PDF / Summary Placeholder 공간 */}
           <div className="absolute inset-4 rounded-3xl border border-white/[0.05] bg-gradient-to-br from-[#0c0c0e] to-[#09090b] flex flex-col items-center justify-center overflow-hidden">
              {viewMode === 'pdf' ? (
                 <div className="flex flex-col items-center justify-center opacity-40 select-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    <span className="text-4xl font-light tracking-[0.2em] font-mono">PDF 내용</span>
                 </div>
              ) : (
                 <div className="flex flex-col items-center justify-center opacity-60 select-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-6 text-indigo-400"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/></svg>
                    <span className="text-4xl font-light tracking-[0.2em] font-mono text-indigo-300">AI 요약 리포트</span>
                 </div>
              )}
           </div>

           {/* 3. Floating Dashboard (우측 하단) */}
           <div 
             className={`absolute bottom-8 right-8 w-[540px] bg-[#111113]/80 backdrop-blur-3xl border border-white/[0.1] rounded-3xl shadow-2xl transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col overflow-hidden ${
               isFloatingOpen ? 'translate-y-0 opacity-100' : 'translate-y-[calc(100%-48px)] opacity-60 hover:opacity-100 cursor-pointer'
             }`}
             onClick={!isFloatingOpen ? () => setIsFloatingOpen(true) : undefined}
           >
              {/* 토글 핸들러 */}
              <button 
                onClick={(e) => { e.stopPropagation(); setIsFloatingOpen(!isFloatingOpen); }}
                className="w-full flex items-center justify-center py-2.5 hover:bg-white/[0.04] transition-colors border-b border-white/[0.05]"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-zinc-500 transition-transform duration-300 ${isFloatingOpen ? 'rotate-180' : ''}`}>
                    <path d="m18 15-6-6-6 6"/>
                 </svg>
              </button>

              <div className="p-8 pb-9 space-y-8">
                 {/* 키워드 영역 */}
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <span className="text-[12px] font-semibold tracking-wider text-zinc-400 w-[75px] shrink-0">강한 키워드</span>
                       <div className="flex gap-2 flex-wrap">
                          {MOCK_DATA.lectureDetails.strongKeywords.map((kw, i) => (
                             <span key={i} className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-md text-[13px] font-medium">{kw}</span>
                          ))}
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <span className="text-[12px] font-semibold tracking-wider text-zinc-400 w-[75px] shrink-0">약한 키워드</span>
                       <div className="flex gap-2 flex-wrap">
                          {MOCK_DATA.lectureDetails.weakKeywords.map((kw, i) => (
                             <span key={i} className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-md text-[13px] font-medium">{kw}</span>
                          ))}
                       </div>
                    </div>
                 </div>

                 {/* Mastery, Coverage, Quiz 3종 세트 영역 */}
                 <div className="flex items-end justify-between pt-2">
                    <div className="flex gap-8">
                       <MiniCircularProgress title="Mastery" percentage={MOCK_DATA.lectureDetails.mastery} color="text-indigo-400" />
                       <MiniCircularProgress title="Coverage" percentage={MOCK_DATA.lectureDetails.coverage} color="text-cyan-400" />
                    </div>
                    
                    {/* Quiz Button */}
                    <Link href="/exam/1" className="flex-1 ml-10 flex flex-col items-center justify-center py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl transition-all duration-200 shadow-xl shadow-indigo-500/20 active:scale-[0.98] group mt-2 mb-1">
                       <span className="text-[18px] font-bold text-white tracking-wider">퀴즈 풀기</span>
                       <span className="text-[12px] text-indigo-200 mt-1 opacity-80 group-hover:opacity-100 font-medium">단원 실력 점검</span>
                    </Link>
                 </div>
              </div>
           </div>
        </main>
      </div>

      {/* 4. 모달 오버레이 (PDF 업로드 폼) - 재사용 */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setIsUploadModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-[#111113] border border-white/[0.1] rounded-2xl shadow-2xl p-8 z-10 animate-in fade-in zoom-in-95 duration-200">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">강의자료 업로드<span className="flex h-2 w-2 rounded-full bg-indigo-500"></span></h3>
                <button onClick={() => setIsUploadModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors p-1"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
             </div>
             <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsUploadModalOpen(false); }}>
                <p className="text-[14px] text-zinc-400 leading-relaxed">PDF 형식의 강의 슬라이드, 필기 노트 등을 업로드하세요.</p>
                <div className="mt-1 flex justify-center px-6 py-10 border-2 border-white/[0.1] border-dashed rounded-xl hover:border-indigo-500/50 hover:bg-indigo-500/[0.02] transition-colors cursor-pointer group relative">
                   <input type="file" accept="application/pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                   <div className="space-y-3 text-center flex flex-col items-center">
                     <div className="p-4 rounded-full bg-white/[0.02] group-hover:bg-indigo-500/10 group-hover:scale-110 transition-all duration-300">
                       <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 group-hover:text-indigo-400 transition-colors"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                     </div>
                     <div className="flex flex-col text-[14px] text-zinc-400 gap-1.5 mt-2">
                       <span><span className="font-medium text-indigo-400">PDF 파일 업로드</span> (클릭)</span>
                       <span>또는 여기로 드래그 앤 드롭하세요</span>
                     </div>
                   </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.05]">
                   <button type="button" onClick={() => setIsUploadModalOpen(false)} className="px-5 py-2.5 rounded-xl text-[14px] font-medium text-zinc-300 hover:bg-white/[0.05] hover:text-white transition-colors">취소</button>
                   <button type="submit" className="px-6 py-2.5 rounded-xl text-[14px] font-medium text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors shadow-lg shadow-indigo-500/20 active:scale-[0.98]">업로드 및 AI 분석</button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
}
