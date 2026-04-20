"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// --- MOCK DATA ---
const MOCK_DATA = {
  subjectName: '소프트웨어공학개론',
  lectures: [
    { id: 1, title: '01강' },
    { id: 2, title: '02강' },
    { id: 3, title: '03강' },
    { id: 4, title: '04강' },
  ],
  mastery: 50,
  coverage: 20,
  strongKeywords: ['생명주기', '요구사항', 'UML'],
  weakKeywords: ['리팩토링', '디자인패턴', 'TDD'],
  recentExams: [
    { id: 1, name: '1회 모의고사', score: '70/100' },
    { id: 2, name: '2회 모의고사', score: '80/100' },
    { id: 3, name: '3회 모의고사', score: '60/100' },
  ]
};

// -- Components --
export const CircularProgress = ({ title, percentage, color }: { title: string, percentage: number, color: string }) => {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-zinc-300 font-medium tracking-wide uppercase text-[15px]">{title}</span>
      <div className="relative flex items-center justify-center w-[120px] h-[120px]">
        {/* SVG Chart */}
        <svg className="w-full h-full transform -rotate-90 drop-shadow-2xl">
          {/* Background circle track */}
          <circle
            cx="60" cy="60" r={radius}
            stroke="currentColor" strokeWidth="8" fill="transparent"
            className="text-white/[0.05]"
          />
          {/* Progress circle */}
          <circle
            cx="60" cy="60" r={radius}
            stroke="currentColor" strokeWidth="8" fill="transparent"
            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-1000 ease-out ${color}`}
            strokeLinecap="round"
          />
        </svg>
        {/* Percentage Text */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white tracking-tighter">
            {percentage}<span className="text-[16px] text-white/50 ml-0.5">%</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default function SubjectDashboard() {
  // 모달 상태 관리
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-[#09090b] text-zinc-50 font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      
      {/* 0. Header */}
      <header className="flex-none px-8 py-5 border-b border-white/[0.05] bg-[#09090b]">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-zinc-400 hover:text-white transition-colors" aria-label="메인 화면으로 돌아가기">
             <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:-translate-x-1 transition-transform">
               <path d="m15 18-6-6 6-6"/>
             </svg>
          </Link>
          <h1 className="text-[22px] font-semibold tracking-tight text-white">{MOCK_DATA.subjectName}</h1>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* 1. Left Sidebar */}
        <aside className="w-[280px] flex-none border-r border-white/[0.05] bg-white/[0.01] flex flex-col">
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
             {MOCK_DATA.lectures.map((lecture) => (
                <Link 
                  href={`/subject/1/lecture/${lecture.id}`}
                  key={lecture.id}
                  className="block w-full py-4 px-6 bg-[#0c0c0e] border border-white/[0.08] hover:border-white/[0.2] rounded-xl text-center font-medium text-[16px] text-zinc-200 hover:text-white hover:bg-white/[0.05] transition-all duration-200 tracking-wide"
                >
                  {lecture.title}
                </Link>
             ))}
          </div>

          <div className="p-6 border-t border-white/[0.05] bg-[#09090b]">
             {/* 모달 열기 이벤트 연결 */}
             <button 
                onClick={() => setIsUploadModalOpen(true)}
                className="w-full py-5 border-2 border-dashed border-white/[0.15] text-zinc-400 rounded-xl flex flex-col items-center justify-center hover:text-indigo-400 hover:border-indigo-400/50 hover:bg-indigo-500/[0.02] transition-colors group"
             >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 group-hover:scale-110 transition-transform">
                   <path d="M5 12h14"/><path d="M12 5v14"/>
                </svg>
                <span className="text-[15px] font-medium">강의자료 추가</span>
             </button>
          </div>
        </aside>

        {/* 2. Right Main Content */}
        <main className="flex-1 overflow-y-auto p-12 bg-gradient-to-br from-[#09090b] to-indigo-900/5">
          <h2 className="text-[26px] font-semibold mb-12 text-white tracking-tight flex items-center gap-3">
            대시보드
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl">
            {/* 좌측 영역 */}
            <div className="lg:col-span-6 flex flex-col gap-12 lg:pr-8">
              <div className="flex gap-12 items-center lg:justify-start justify-center">
                 <CircularProgress title="Mastery" percentage={MOCK_DATA.mastery} color="text-indigo-400" />
                 <CircularProgress title="Coverage" percentage={MOCK_DATA.coverage} color="text-cyan-400" />
              </div>

              <div className="mt-4">
                <Link href="/exam/1"
                  className="w-full lg:w-3/4 mx-auto lg:mx-0 px-8 py-5 bg-white/[0.03] border border-white/[0.1] hover:bg-white/[0.08] hover:border-white/[0.2] rounded-xl text-[17px] font-semibold text-white transition-all duration-200 flex justify-center items-center gap-2 group"
                >
                   모의고사
                   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 group-hover:text-white transition-colors group-hover:translate-x-1">
                     <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                   </svg>
                </Link>
              </div>
            </div>

            {/* 우측 영역 */}
            <div className="lg:col-span-6 flex flex-col gap-12 lg:pl-10 lg:border-l lg:border-white/[0.08]">
               <div className="space-y-8">
                 <div>
                   <h3 className="text-[14px] font-semibold tracking-wider text-zinc-300 mb-4">강한 키워드</h3>
                   <div className="flex flex-wrap gap-2">
                     {MOCK_DATA.strongKeywords.map((kw, i) => (
                        <span key={`strong-${i}`} className="px-4 py-2 rounded-[8px] border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-[14px] font-medium tracking-wide">
                          {kw}
                        </span>
                     ))}
                   </div>
                 </div>

                 <div>
                   <h3 className="text-[14px] font-semibold tracking-wider text-zinc-300 mb-4">약한 키워드</h3>
                   <div className="flex flex-wrap gap-2">
                     {MOCK_DATA.weakKeywords.map((kw, i) => (
                        <span key={`weak-${i}`} className="px-4 py-2 rounded-[8px] border border-rose-500/30 bg-rose-500/10 text-rose-300 text-[14px] font-medium tracking-wide">
                          {kw}
                        </span>
                     ))}
                   </div>
                 </div>
               </div>

               <div className="pt-2">
                  <h3 className="text-[14px] font-semibold tracking-wider text-zinc-300 mb-4">최근 푼 모의고사</h3>
                  <div className="flex flex-col border-y border-white/[0.08]">
                    {MOCK_DATA.recentExams.map((exam, idx) => (
                      <Link 
                        href={`/exam/${exam.id}/review`} 
                        key={exam.id}
                        className={`flex items-center justify-between px-2 py-4 hover:bg-white/[0.04] transition-colors group ${idx !== MOCK_DATA.recentExams.length - 1 ? 'border-b border-white/[0.05]' : ''}`}
                      >
                         <span className="text-zinc-200 text-[15px] group-hover:text-indigo-300 transition-colors">
                           {exam.name}
                         </span>
                         <span className="text-zinc-400 font-mono text-sm tracking-wider">
                           {exam.score}
                         </span>
                      </Link>
                    ))}
                  </div>
               </div>
            </div>

          </div>
        </main>
      </div>

      {/* 3. 모달 오버레이 (PDF 업로드 폼) */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* 어두운 배경 */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity" 
            onClick={() => setIsUploadModalOpen(false)}
          />
          
          {/* 모달 콘텐츠 박스 */}
          <div className="relative w-full max-w-lg bg-[#111113] border border-white/[0.1] rounded-2xl shadow-2xl p-8 z-10 animate-in fade-in zoom-in-95 duration-200">
             
             {/* 상단 닫기/타이틀 */}
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
                  강의자료 업로드
                  <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
                </h3>
                <button 
                  onClick={() => setIsUploadModalOpen(false)}
                  className="text-zinc-500 hover:text-white transition-colors p-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
             </div>

             {/* 업로드 폼 영역 */}
             <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsUploadModalOpen(false); }}>
                <p className="text-[14px] text-zinc-400 leading-relaxed">
                  PDF 형식의 강의 슬라이드, 필기 노트 등을 업로드하세요. <br/>
                  AI가 즉시 내용을 스캔하여 키워드를 추출하고 맞춤 퀴즈를 준비합니다.
                </p>

                {/* PDF 파일 드래그 & 드롭 영역 */}
                <div className="mt-1 flex justify-center px-6 py-10 border-2 border-white/[0.1] border-dashed rounded-xl hover:border-indigo-500/50 hover:bg-indigo-500/[0.02] transition-colors cursor-pointer group relative">
                   
                   {/* 네이티브 파일 인풋 (PDF만 허용, 투명화) */}
                   <input 
                     type="file" 
                     accept="application/pdf"
                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                   />
                   
                   <div className="space-y-3 text-center flex flex-col items-center">
                     <div className="p-4 rounded-full bg-white/[0.02] group-hover:bg-indigo-500/10 group-hover:scale-110 transition-all duration-300">
                       <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 group-hover:text-indigo-400 transition-colors">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="17 8 12 3 7 8"/>
                          <line x1="12" y1="3" x2="12" y2="15"/>
                       </svg>
                     </div>
                     <div className="flex flex-col text-[14px] text-zinc-400 gap-1.5 mt-2 transition-colors group-hover:text-zinc-300">
                       <span>
                         <span className="font-medium text-indigo-400">PDF 파일 업로드</span> (클릭)
                       </span>
                       <span>또는 여기로 드래그 앤 드롭하세요</span>
                     </div>
                     <p className="text-[12px] text-zinc-500 mt-2 font-mono">MAX 50MB</p>
                   </div>
                </div>

                {/* 액션 버튼 */}
                <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.05]">
                   <button 
                     type="button" 
                     onClick={() => setIsUploadModalOpen(false)}
                     className="px-5 py-2.5 rounded-xl text-[14px] font-medium text-zinc-300 hover:bg-white/[0.05] hover:text-white transition-colors"
                   >
                     취소
                   </button>
                   <button 
                     type="submit" 
                     className="px-6 py-2.5 rounded-xl text-[14px] font-medium text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
                   >
                     업로드 및 AI 분석
                   </button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
}
