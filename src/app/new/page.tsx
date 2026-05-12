import React from 'react';
import Link from 'next/link';

export default function AddSubjectPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans p-4 md:p-8 flex items-center justify-center">
      
      <div className="w-full max-w-md bg-white border border-gray-200 rounded p-6 shadow-sm">
        
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors mb-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          뒤로 가기
        </Link>

        {/* Title */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            새로운 과목 추가
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            학습할 새로운 과정을 등록하세요.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          
          {/* Subject Name Input */}
          <div className="space-y-1">
            <label htmlFor="subjectName" className="block text-sm font-medium text-gray-700">
              과목명
            </label>
            <input 
              type="text" 
              id="subjectName"
              placeholder="예: 클라우드 컴퓨팅 기초"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
            />
          </div>

          {/* Image Upload Area */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              대표 이미지
            </label>
            <div className="mt-1">
              <input 
                type="file" 
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none border border-gray-300 rounded cursor-pointer bg-white"
              />
              <p className="text-xs text-gray-500 mt-2">
                PNG, JPG, GIF (최대 10MB)
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button 
              type="button" 
              className="w-full py-2 px-4 border border-transparent rounded text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors"
            >
              새로운 과목 생성하기
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
