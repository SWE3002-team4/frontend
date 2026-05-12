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
    <div className="flex-1 w-full min-h-screen bg-gray-100 text-gray-900 font-sans">
      {/* 1. Navbar */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-4 md:px-8 py-3 w-full border-b border-gray-200 bg-white">
        <div className="flex items-center">
          <Link href="/" className="text-lg font-bold text-gray-800 text-decoration-none">
            SudoCampus
          </Link>
        </div>
        
        {/* Right Info */}
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            className="flex items-center justify-center p-2 rounded text-gray-600 hover:bg-gray-100 border border-transparent hover:border-gray-300 transition-colors"
            aria-label="사용자 프로필"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
          <Link 
            href="/login"
            className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            로그아웃
          </Link>
        </div>
      </header>

      {/* 2. Main Content */}
      <main className="px-4 md:px-8 py-8 max-w-7xl mx-auto w-full">
        
        <h2 className="text-xl font-bold mb-4 text-gray-800">내 과목 목록</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          
          {/* Subject Cards */}
          {MOCK_SUBJECTS.map((subject) => (
            <Link 
              href={`/subject/${subject.id}`}
              key={subject.id}
              className="group flex flex-col bg-white border border-gray-200 rounded overflow-hidden hover:shadow-sm transition-shadow cursor-pointer"
            >
              {/* Image & Progress */}
              <div className="relative h-40 w-full bg-gray-200 border-b border-gray-200">
                <img
                  src={subject.imageUrl}
                  alt={subject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded shadow-sm border border-gray-200 flex flex-col items-end">
                  <span className="text-[10px] text-gray-500 uppercase font-bold">숙련도</span>
                  <span className="text-sm font-bold text-blue-600">
                    {subject.progress}%
                  </span>
                </div>
              </div>
              
              {/* Title */}
              <div className="p-3 bg-white">
                <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
                  {subject.title}
                </h3>
              </div>
            </Link>
          ))}

          {/* Add Subject Card */}
          <Link href="/new" className="flex flex-col items-center justify-center min-h-[12rem] bg-gray-50 border-2 border-dashed border-gray-300 rounded hover:border-blue-500 hover:bg-blue-50/50 hover:text-blue-600 transition-colors cursor-pointer text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
              <path d="M5 12h14"/><path d="M12 5v14"/>
            </svg>
            <span className="text-sm font-medium">과목 추가</span>
          </Link>

        </div>
      </main>
    </div>
  );
}
