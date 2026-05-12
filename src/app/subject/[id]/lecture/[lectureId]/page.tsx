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
export const MiniCircularProgress = ({ title, percentage, colorClass }: { title: string, percentage: number, colorClass: string }) => {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-gray-600 font-bold text-xs uppercase">{title}</span>
      <div className="relative flex items-center justify-center w-[64px] h-[64px]">
        {/* SVG Chart */}
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="5" fill="transparent" className="text-gray-200"/>
          <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="5" fill="transparent" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className={`transition-all duration-1000 ease-out ${colorClass}`} strokeLinecap="round"/>
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-sm font-bold text-gray-800">
            {percentage}<span className="text-[10px] text-gray-500 font-normal">%</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default function LectureDashboard() {
  const params = useParams();
  const lectureId = params?.lectureId || '1';

  const [viewMode, setViewMode] = useState<'pdf' | 'summary'>('pdf');
  const [isFloatingOpen, setIsFloatingOpen] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-100 text-gray-900 font-sans overflow-hidden relative">
      
      {/* 0. Header */}
      <header className="flex-none px-4 md:px-8 py-3 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-4">
          <Link href="/subject/1" className="text-gray-500 hover:text-gray-700 transition-colors" aria-label="메인 화면으로 돌아가기">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="m15 18-6-6 6-6"/>
             </svg>
          </Link>
          <h1 className="text-lg font-bold text-gray-800">{MOCK_DATA.subjectName}</h1>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* 1. Left Sidebar */}
        <aside className="w-[280px] flex-none border-r border-gray-200 bg-white flex flex-col z-10">
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
             <h5 className="text-sm font-bold text-gray-500 uppercase mb-3 px-2">강의 목록</h5>
             {MOCK_DATA.lectures.map((lecture) => {
                const isActive = lecture.id === lectureId;
                return (
                  <Link 
                    href={`/subject/1/lecture/${lecture.id}`}
                    key={lecture.id}
                    className={`block w-full py-3 px-4 border rounded text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold' 
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {lecture.title}
                  </Link>
                );
             })}
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50">
             <button 
                onClick={() => setIsUploadModalOpen(true)} 
                className="w-full py-4 border-2 border-dashed border-gray-300 text-gray-600 rounded flex flex-col items-center justify-center hover:border-blue-500 hover:text-blue-600 bg-white transition-colors"
             >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1">
                   <path d="M5 12h14"/><path d="M12 5v14"/>
                </svg>
                <span className="text-sm font-medium">강의자료 추가</span>
             </button>
          </div>
        </aside>

        {/* 2. Main Viewer Area */}
        <main className="flex-1 relative bg-gray-200 overflow-hidden flex flex-col p-4">
           
           {/* 상단 뷰어 토글 브릿지 */}
           <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex bg-white border border-gray-300 rounded p-1 shadow-sm">
              <button 
                onClick={() => setViewMode('pdf')}
                className={`flex items-center gap-2 px-6 py-2 rounded text-sm font-bold transition-colors ${viewMode === 'pdf' ? 'bg-gray-100 text-gray-800 border border-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
              >
                원본 PDF
              </button>
              <button 
                onClick={() => setViewMode('summary')}
                className={`flex items-center gap-2 px-6 py-2 rounded text-sm font-bold transition-colors ${viewMode === 'summary' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-gray-500 hover:text-gray-700'}`}
              >
                AI 요약
              </button>
           </div>

           {/* PDF / Summary Placeholder 공간 */}
           <div className="flex-1 rounded border border-gray-300 bg-white shadow-sm flex flex-col items-center justify-center overflow-hidden relative">
              {viewMode === 'pdf' ? (
                 <div className="flex flex-col items-center justify-center text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    <span className="text-2xl font-bold tracking-widest text-gray-400">PDF 내용</span>
                 </div>
              ) : (
                 <div className="flex flex-col items-center justify-center text-blue-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-blue-300"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/></svg>
                    <span className="text-2xl font-bold tracking-widest text-blue-300">AI 요약 리포트</span>
                 </div>
              )}
           </div>

           {/* 3. Floating Dashboard (우측 하단) */}
           <div 
             className={`absolute bottom-8 right-8 w-[400px] bg-white border border-gray-300 rounded shadow-lg transition-transform duration-300 flex flex-col overflow-hidden ${
               isFloatingOpen ? 'translate-y-0' : 'translate-y-[calc(100%-40px)] cursor-pointer'
             }`}
             onClick={!isFloatingOpen ? () => setIsFloatingOpen(true) : undefined}
           >
              {/* 토글 핸들러 */}
              <button 
                onClick={(e) => { e.stopPropagation(); setIsFloatingOpen(!isFloatingOpen); }}
                className="w-full flex items-center justify-center py-2 hover:bg-gray-50 transition-colors border-b border-gray-200 bg-gray-100 text-gray-600"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isFloatingOpen ? 'rotate-180' : ''}`}>
                    <path d="m18 15-6-6-6 6"/>
                 </svg>
              </button>

              <div className="p-6 space-y-6">
                 {/* 키워드 영역 */}
                 <div className="space-y-3">
                    <div className="flex items-start gap-2 flex-col">
                       <span className="text-xs font-bold text-gray-500 uppercase">강한 키워드</span>
                       <div className="flex gap-2 flex-wrap">
                          {MOCK_DATA.lectureDetails.strongKeywords.map((kw, i) => (
                             <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">{kw}</span>
                          ))}
                       </div>
                    </div>
                    <div className="flex items-start gap-2 flex-col">
                       <span className="text-xs font-bold text-gray-500 uppercase">약한 키워드</span>
                       <div className="flex gap-2 flex-wrap">
                          {MOCK_DATA.lectureDetails.weakKeywords.map((kw, i) => (
                             <span key={i} className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold">{kw}</span>
                          ))}
                       </div>
                    </div>
                 </div>

                 <hr className="border-gray-200" />

                 {/* Mastery, Coverage, Quiz 3종 세트 영역 */}
                 <div className="flex items-center gap-6 justify-between">
                    <div className="flex gap-6">
                       <MiniCircularProgress title="Mastery" percentage={MOCK_DATA.lectureDetails.mastery} colorClass="text-blue-600" />
                       <MiniCircularProgress title="Coverage" percentage={MOCK_DATA.lectureDetails.coverage} colorClass="text-green-600" />
                    </div>
                    
                    {/* Quiz Button */}
                    <div className="flex-1 ml-4">
                      <Link href="/exam/1" className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-center rounded transition-colors text-sm">
                         단원 퀴즈 플기
                      </Link>
                    </div>
                 </div>
              </div>
           </div>
        </main>
      </div>

      {/* 4. 모달 오버레이 (PDF 업로드) */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => setIsUploadModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white border border-gray-200 rounded p-6 shadow-lg z-10">
             <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
                <h3 className="text-lg font-bold text-gray-800">강의자료 업로드</h3>
                <button onClick={() => setIsUploadModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
             </div>
             <form onSubmit={(e) => { e.preventDefault(); setIsUploadModalOpen(false); }}>
                <p className="text-sm text-gray-600 mb-4">PDF 형식의 강의 슬라이드, 필기 노트 등을 업로드하세요.</p>
                <div className="mb-4">
                   <input type="file" accept="application/pdf" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 bg-gray-50 border border-gray-300 rounded cursor-pointer p-2" />
                </div>
                <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
                   <button type="button" onClick={() => setIsUploadModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">취소</button>
                   <button type="submit" className="px-4 py-2 border border-transparent rounded text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">업로드 및 AI 분석</button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
}
