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
export const CircularProgress = ({ title, percentage, colorClass }: { title: string, percentage: number, colorClass: string }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-gray-600 font-bold uppercase text-sm">{title}</span>
      <div className="relative flex items-center justify-center w-[100px] h-[100px]">
        {/* SVG Chart */}
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle track */}
          <circle
            cx="50" cy="50" r={radius}
            stroke="currentColor" strokeWidth="8" fill="transparent"
            className="text-gray-200"
          />
          {/* Progress circle */}
          <circle
            cx="50" cy="50" r={radius}
            stroke="currentColor" strokeWidth="8" fill="transparent"
            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-1000 ease-out ${colorClass}`}
            strokeLinecap="round"
          />
        </svg>
        {/* Percentage Text */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-gray-800">
            {percentage}<span className="text-sm font-normal text-gray-500 ml-0.5">%</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default function SubjectDashboard() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-100 text-gray-900 font-sans overflow-hidden relative">
      
      {/* 0. Header */}
      <header className="flex-none px-4 md:px-8 py-3 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors" aria-label="메인 화면으로 돌아가기">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="m15 18-6-6 6-6"/>
             </svg>
          </Link>
          <h1 className="text-lg font-bold text-gray-800">{MOCK_DATA.subjectName}</h1>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* 1. Left Sidebar */}
        <aside className="w-[280px] flex-none border-r border-gray-200 bg-white flex flex-col">
          
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
             <h5 className="text-sm font-bold text-gray-500 uppercase mb-3 px-2">강의 목록</h5>
             {MOCK_DATA.lectures.map((lecture) => (
                <Link 
                  href={`/subject/1/lecture/${lecture.id}`}
                  key={lecture.id}
                  className="block w-full py-3 px-4 bg-white border border-gray-200 rounded text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors font-medium text-sm"
                >
                  {lecture.title}
                </Link>
             ))}
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50">
             <button 
                onClick={() => setIsUploadModalOpen(true)}
                className="w-full py-4 border-2 border-dashed border-gray-300 text-gray-600 rounded flex flex-col items-center justify-center hover:border-blue-500 hover:text-blue-600 bg-white transition-colors"
             >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1">
                   <path d="M5 12h14"/><path d="M12 5v14"/>
                </svg>
                <span className="text-sm font-medium">강의자료 추가</span>
             </button>
          </div>
        </aside>

        {/* 2. Right Main Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-100">
          
          <div className="max-w-5xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              대시보드
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column */}
              <div className="flex flex-col gap-8">
                
                <div className="bg-white border border-gray-200 rounded p-6 shadow-sm">
                   <h3 className="text-lg font-bold text-gray-800 mb-6">학습 진행도</h3>
                   <div className="flex justify-around items-center">
                     <CircularProgress title="Mastery" percentage={MOCK_DATA.mastery} colorClass="text-blue-600" />
                     <CircularProgress title="Coverage" percentage={MOCK_DATA.coverage} colorClass="text-green-600" />
                   </div>
                </div>

                <div className="bg-white border border-gray-200 rounded p-6 shadow-sm">
                   <h3 className="text-lg font-bold text-gray-800 mb-4">학습 키워드 분석</h3>
                   
                   <div className="mb-4">
                     <h4 className="text-sm font-bold text-gray-500 mb-2">강한 키워드</h4>
                     <div className="flex flex-wrap gap-2">
                       {MOCK_DATA.strongKeywords.map((kw, i) => (
                          <span key={`strong-${i}`} className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-semibold">
                            {kw}
                          </span>
                       ))}
                     </div>
                   </div>

                   <div>
                     <h4 className="text-sm font-bold text-gray-500 mb-2">약한 키워드</h4>
                     <div className="flex flex-wrap gap-2">
                       {MOCK_DATA.weakKeywords.map((kw, i) => (
                          <span key={`weak-${i}`} className="px-2 py-1 rounded bg-red-100 text-red-800 text-xs font-semibold">
                            {kw}
                          </span>
                       ))}
                     </div>
                   </div>
                </div>

              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-8">
                 
                 <div className="bg-white border border-gray-200 rounded p-6 shadow-sm h-full">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">모의고사</h3>
                    
                    <Link href="/exam/1" className="block w-full text-center py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition-colors mb-8">
                       모의고사 풀기
                    </Link>

                    <h4 className="text-sm font-bold text-gray-500 mb-2 border-b border-gray-200 pb-2">최근 푼 모의고사</h4>
                    <div className="flex flex-col">
                      {MOCK_DATA.recentExams.map((exam, idx) => (
                        <Link 
                          href={`/exam/${exam.id}/review`} 
                          key={exam.id}
                          className={`flex items-center justify-between py-3 hover:bg-gray-50 transition-colors ${idx !== MOCK_DATA.recentExams.length - 1 ? 'border-b border-gray-200' : ''}`}
                        >
                           <span className="text-gray-700 text-sm font-medium">
                             {exam.name}
                           </span>
                           <span className="text-gray-500 font-mono text-sm">
                             {exam.score}
                           </span>
                        </Link>
                      ))}
                    </div>
                 </div>

              </div>
            </div>
          </div>
        </main>
      </div>

      {/* 3. Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" 
            onClick={() => setIsUploadModalOpen(false)}
          />
          
          <div className="relative w-full max-w-lg bg-white border border-gray-200 rounded p-6 shadow-lg z-10">
             
             <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
                <h3 className="text-lg font-bold text-gray-800">
                  강의자료 업로드
                </h3>
                <button 
                  onClick={() => setIsUploadModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
             </div>

             <form onSubmit={(e) => { e.preventDefault(); setIsUploadModalOpen(false); }}>
                <p className="text-sm text-gray-600 mb-4">
                  PDF 형식의 강의 슬라이드, 필기 노트 등을 업로드하세요. <br/>
                  AI가 즉시 내용을 스캔하여 키워드를 추출하고 맞춤 퀴즈를 준비합니다.
                </p>

                <div className="mb-4">
                   <input 
                     type="file" 
                     accept="application/pdf"
                     className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 bg-gray-50 border border-gray-300 rounded cursor-pointer p-2"
                   />
                   <p className="text-xs text-gray-500 mt-2">MAX 50MB</p>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
                   <button 
                     type="button" 
                     onClick={() => setIsUploadModalOpen(false)}
                     className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                   >
                     취소
                   </button>
                   <button 
                     type="submit" 
                     className="px-4 py-2 border border-transparent rounded text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
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
