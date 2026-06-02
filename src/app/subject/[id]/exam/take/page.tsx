"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { MockExamSession } from '../../../../../types/exam';
import { SingleChoiceQuiz } from '../../../../../components/quiz/SingleChoiceQuiz';
import { MultipleChoiceQuiz } from '../../../../../components/quiz/MultipleChoiceQuiz';
import { ShortAnswerQuiz } from '../../../../../components/quiz/ShortAnswerQuiz';

export default function MockExamTakePage() {
  const params = useParams();
  const router = useRouter();
  const subjectId = params.id as string;

  const [examSession, setExamSession] = useState<MockExamSession | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Read from sessionStorage
    const stored = sessionStorage.getItem('MOCK_EXAM_SESSION');
    if (stored) {
      try {
        setExamSession(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse mock exam session', e);
      }
    }
  }, []);

  if (!examSession) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-gray-100 text-gray-900 font-sans p-6 text-center">
         <div className="max-w-md bg-white border border-gray-200 rounded p-8 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-2">세션 만료</h3>
            <p className="text-sm text-gray-500 mb-6">진행 중인 모의고사 데이터를 찾을 수 없습니다.</p>
            <Link 
              href={`/subject/${subjectId}/exam/setup`} 
              className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              모의고사 다시 생성하기
            </Link>
         </div>
      </div>
    );
  }

  const currentQuestion = examSession.questions[currentIndex];
  const totalQuestions = examSession.questions.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const saveAnswer = (questionId: string, value: any) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const submitAll = async () => {
    setIsSubmitting(true);
    // API Submit 모방 (1초 대기)
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('[MockExamTakePage] Submitted Answers:', userAnswers);
    
    alert('모의고사가 제출되었습니다. (현재 프론트엔드 시뮬레이션 상태입니다.)');
    router.push(`/subject/${subjectId}`);
  };

  // Type Handlers
  const handleSingleChoiceSelect = (opt: string) => {
    saveAnswer(currentQuestion.id, opt);
  };

  const handleMultipleChoiceToggle = (opt: string) => {
    const currentSelected = (userAnswers[currentQuestion.id] as string[]) || [];
    if (currentSelected.includes(opt)) {
      saveAnswer(currentQuestion.id, currentSelected.filter(item => item !== opt));
    } else {
      saveAnswer(currentQuestion.id, [...currentSelected, opt]);
    }
  };

  const handleShortAnswerChange = (text: string) => {
    saveAnswer(currentQuestion.id, text);
  };

  // Badge Color
  let diffBadge = null;
  if (currentQuestion.difficulty === 'HIGH') diffBadge = <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-rose-100 text-rose-800">상</span>;
  else if (currentQuestion.difficulty === 'MEDIUM') diffBadge = <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-yellow-100 text-yellow-800">중</span>;
  else if (currentQuestion.difficulty === 'LOW') diffBadge = <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-green-100 text-green-800">하</span>;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded shadow-sm overflow-hidden flex flex-col">
         {/* Quiz Header */}
         <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <h1 className="text-base font-bold text-gray-800">{examSession.title}</h1>
            <div className="text-sm font-bold text-gray-500">
              <span className="text-blue-600">{currentIndex + 1}</span> / {totalQuestions}
            </div>
         </div>

         {/* Progress Bar */}
         <div className="w-full bg-gray-200 h-1.5">
            <div 
              className="bg-blue-600 h-1.5 transition-all duration-300 ease-out" 
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
         </div>

         {/* Question Content */}
         <div className="p-6 md:p-8 flex-1">
            <div className="mb-6">
               <div className="flex gap-2 mb-3">
                 <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-gray-200 text-gray-700">
                   {currentQuestion.type === 'SINGLE_CHOICE' && '객관식(단일)'}
                   {currentQuestion.type === 'MULTIPLE_CHOICE' && '객관식(다중)'}
                   {currentQuestion.type === 'SHORT_ANSWER' && '주관식'}
                 </span>
                 {diffBadge}
               </div>
               <h2 className="text-[17px] font-bold text-gray-800 leading-relaxed">
                 {currentIndex + 1}. {currentQuestion.text}
               </h2>
            </div>

            {/* Dynamic Quiz Component Rendering */}
            <div className="py-4">
               {currentQuestion.type === 'SINGLE_CHOICE' && (
                 <SingleChoiceQuiz 
                   question={currentQuestion}
                   selectedId={userAnswers[currentQuestion.id] || ''}
                   onSelect={handleSingleChoiceSelect}
                 />
               )}
               {currentQuestion.type === 'MULTIPLE_CHOICE' && (
                 <MultipleChoiceQuiz 
                   question={currentQuestion}
                   selectedIds={userAnswers[currentQuestion.id] || []}
                   onToggle={handleMultipleChoiceToggle}
                 />
               )}
               {currentQuestion.type === 'SHORT_ANSWER' && (
                 <ShortAnswerQuiz 
                   question={currentQuestion}
                   inputValue={userAnswers[currentQuestion.id] || ''}
                   onInputChange={handleShortAnswerChange}
                 />
               )}
            </div>
         </div>

         {/* Footer Controls */}
         <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <Link 
              href={`/subject/${subjectId}`}
              className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
            >
              종료하고 나가기
            </Link>
            
            <button
              onClick={isLastQuestion ? submitAll : handleNext}
              disabled={isSubmitting}
              className={`px-6 py-2 rounded text-sm font-bold text-white transition-colors flex items-center gap-2 ${
                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  제출 중...
                </>
              ) : isLastQuestion ? (
                '제출 및 결과 보기'
              ) : (
                '다음 문제'
              )}
            </button>
         </div>

      </div>
    </div>
  );
}
