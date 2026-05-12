"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// Mock Config for Review
const MOCK_REVIEW_DATA = {
  title: '소프트웨어공학개론 제 1회 모의고사',
  subjectId: '1',
  score: 66,
  questions: [
    {
      id: 1,
      type: 'single',
      difficulty: '하',
      question: '다음 중 소프트웨어 생명주기 모델이 아닌 것은 무엇입니까?',
      options: ['폭포수 모델', '나선형 모델', 'V 모델', '피라미드 모델'],
      correctAnswer: '피라미드 모델',
      userAnswer: 'V 모델', // 틀림
      isCorrect: false,
      keywords: ['소프트웨어 생명주기', '기초개념'],
      explanation: '폭포수 모델, 나선형 모델, V 모델은 모두 대표적인 소프트웨어 생명주기 모델입니다. 그러나 피라미드 모델은 공식적인 프로세스 생명주기로 사용되지 않는 가상의 개념입니다.'
    },
    {
      id: 2,
      type: 'multiple',
      difficulty: '중',
      question: '애자일(Agile) 선언문의 4가지 핵심 기조 중 올바른 것을 모두 고르시오.',
      options: [
        '공정이나 도구보다 개인과 상호작용', 
        '포괄적인 문서보다 정상적으로 작동하는 소프트웨어', 
        '고객 협력보다 계약 협상', 
        '변화에 대응하기보다 계획 따르기'
      ],
      correctAnswer: ['공정이나 도구보다 개인과 상호작용', '포괄적인 문서보다 정상적으로 작동하는 소프트웨어'],
      userAnswer: ['공정이나 도구보다 개인과 상호작용', '포괄적인 문서보다 정상적으로 작동하는 소프트웨어'], // 맞음
      isCorrect: true,
      keywords: ['Agile 방법론', '소프트웨어 방법론'],
      explanation: '애자일의 4가지 핵심 가치는 다음과 같습니다.\n1. 공정과 도구보다 개인과 상호작용을\n2. 포괄적인 문서보다 작동하는 소프트웨어를\n3. 계약 협상보다 고객과의 협력을\n4. 계획을 따르기보다 변화에 대응하기를 가치있게 여긴다.'
    },
    {
      id: 3,
      type: 'short',
      difficulty: '상',
      question: '객체지향 설계 원칙 (SOLID) 중 "소프트웨어 개체는 확장에 대해 열려 있어야 하고, 수정에 대해서는 닫혀 있어야 한다"는 원칙의 영문 약어는 무엇입니까?',
      correctAnswer: 'OCP',
      userAnswer: 'ocp', // 맞음
      isCorrect: true,
      keywords: ['객체지향 설계 (SOLID)', 'OCP 원칙'],
      explanation: 'OCP (Open-Closed Principle, 개방-폐쇄 원칙)는 기존의 코드를 변경하지 않으면서(Closed), 기능을 추가할 수 있도록(Open) 설계가 되어야 한다는 객체지향 설계의 핵심 원칙 중 하나입니다.'
    }
  ]
};

export default function ExamReviewPage() {
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);

  const selectedQuestion = MOCK_REVIEW_DATA.questions.find(q => q.id === selectedQuestionId);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans flex flex-col overflow-hidden">
      
      {/* Top Header */}
      <header className="flex-none px-4 md:px-8 py-3 border-b border-gray-200 bg-white z-20">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
           <div className="flex items-center gap-3">
             <Link href={`/subject/${MOCK_REVIEW_DATA.subjectId}`} className="text-gray-500 hover:text-gray-700 transition-colors p-1 bg-gray-50 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
             </Link>
             <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                {MOCK_REVIEW_DATA.title}
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[11px] rounded font-bold uppercase">풀이 기록</span>
             </h1>
           </div>
           
           <div className="text-sm font-bold text-gray-600">
             최종 점수: <span className="text-blue-600 text-xl ml-1">{MOCK_REVIEW_DATA.score}</span>점
           </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto relative p-4 md:p-8">
         <div className="max-w-4xl mx-auto space-y-4 pb-20">
            
            {MOCK_REVIEW_DATA.questions.map((q, idx) => (
               <div 
                 key={q.id}
                 onClick={() => setSelectedQuestionId(q.id)}
                 className={`group w-full bg-white border ${q.isCorrect ? 'border-green-300 border-[2px]' : 'border-red-300 border-[2px]'} rounded shadow-sm hover:shadow-md p-6 cursor-pointer transition-shadow flex gap-4`}
               >
                     {/* Question Number & Status Icon */}
                     <div className="flex flex-col items-center gap-2 mt-1 flex-none w-[40px]">
                        <span className="text-xl font-bold text-gray-400">
                          {idx + 1}.
                        </span>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${q.isCorrect ? 'border-green-500 text-green-600 bg-green-50' : 'border-red-500 text-red-600 bg-red-50'}`}>
                           {q.isCorrect ? (
                             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                           ) : (
                             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                           )}
                        </div>
                     </div>

                     <div className="flex-1">
                        {/* Question Title & Keyword */}
                        <div className="mb-4">
                           <h2 className="text-[17px] font-bold text-gray-800 mb-2">
                             {q.question}
                           </h2>
                           <div className="flex flex-wrap gap-2">
                             {q.keywords.map((kw, i) => (
                               <span key={i} className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-[11px] font-bold">
                                 {kw}
                               </span>
                             ))}
                           </div>
                        </div>

                        {/* Options Read-Only Render */}
                        <div className="space-y-2">
                           
                           {/* Single Choice Review */}
                           {q.type === 'single' && q.options?.map((opt, i) => {
                             const isCorrectAnswer = opt === q.correctAnswer;
                             const isUserAnswer = opt === q.userAnswer;
                             
                             let optClass = "bg-white border border-gray-300 text-gray-700";
                             let label = "";

                             if (isCorrectAnswer) {
                               optClass = "bg-green-50 border-green-500 text-green-900 font-bold shadow-sm";
                               label = "정답";
                             } else if (!isCorrectAnswer && isUserAnswer) {
                               optClass = "bg-red-50 border-red-500 text-red-900 font-bold shadow-sm";
                               label = "오답 선택";
                             }

                             return (
                               <div key={i} className={`w-full flex items-center justify-between p-3 rounded transition-colors ${optClass}`}>
                                  <div className="flex items-center gap-3">
                                     <input type="radio" readOnly checked={isUserAnswer || isCorrectAnswer} className="mt-0.5" />
                                     <span className="text-sm">{opt}</span>
                                  </div>
                                  {label && <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${isCorrectAnswer ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>{label}</span>}
                               </div>
                             );
                           })}

                           {/* Multiple Choice Review */}
                           {q.type === 'multiple' && q.options?.map((opt, i) => {
                             const isCorrectAnswer = (q.correctAnswer as string[]).includes(opt);
                             const isUserAnswer = (q.userAnswer as string[]).includes(opt);
                             
                             let optClass = "bg-white border border-gray-300 text-gray-700";
                             let label = "";

                             if (isCorrectAnswer && isUserAnswer) {
                               optClass = "bg-green-50 border-green-500 text-green-900 font-bold shadow-sm";
                               label = "정답 (맞춤)";
                             } else if (isCorrectAnswer && !isUserAnswer) {
                               optClass = "bg-white border-green-500 text-green-700 font-bold border-dashed";
                               label = "정답 (미선택)";
                             } else if (!isCorrectAnswer && isUserAnswer) {
                               optClass = "bg-red-50 border-red-500 text-red-900 font-bold shadow-sm";
                               label = "오답 선택";
                             }

                             return (
                               <div key={i} className={`w-full flex items-center justify-between p-3 rounded transition-colors ${optClass}`}>
                                  <div className="flex items-center gap-3">
                                     <input type="checkbox" readOnly checked={isUserAnswer || isCorrectAnswer} className="mt-0.5" />
                                     <span className="text-sm">{opt}</span>
                                  </div>
                                  {label && <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${isCorrectAnswer ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>{label}</span>}
                               </div>
                             );
                           })}

                           {/* Short Answer Review */}
                           {q.type === 'short' && (
                              <div className="flex flex-col md:flex-row gap-3">
                                 <div className="flex-1 bg-white border border-gray-300 rounded p-3">
                                    <span className="block text-[11px] font-bold text-gray-500 uppercase mb-1">내가 제출한 답</span>
                                    <div className={`text-sm font-bold ${q.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                                       {q.userAnswer as string} 
                                    </div>
                                 </div>
                                 <div className="flex-1 bg-green-50 border border-green-300 rounded p-3">
                                    <span className="block text-[11px] font-bold text-green-700 uppercase mb-1">실제 정답</span>
                                    <div className="text-sm font-bold text-green-900">
                                       {q.correctAnswer as string} 
                                    </div>
                                 </div>
                              </div>
                           )}

                        </div>

                        {/* Slide Indicator */}
                        <div className="mt-4 flex justify-end text-blue-600 text-[12px] font-bold items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                           클릭하여 해설 보기
                           <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="-rotate-45"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </div>
                     </div>

               </div>
            ))}

         </div>
      </div>

      {/* Right Side Explanation Modal */}
      {selectedQuestionId !== null && selectedQuestion && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-gray-900/40"
            onClick={() => setSelectedQuestionId(null)}
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white border-l border-gray-200 shadow-xl flex flex-col transform transition-transform duration-300 ease-out animate-in slide-in-from-right-full">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
               <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
                 문제 해설
               </h3>
               <button onClick={() => setSelectedQuestionId(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
               </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
               <div>
                  <div className="flex flex-wrap gap-1 mb-2">
                     {selectedQuestion.keywords.map((kw, i) => (
                       <span key={i} className="text-[11px] bg-gray-200 px-2 py-0.5 rounded text-gray-700 font-bold">
                         # {kw}
                       </span>
                     ))}
                  </div>
                  <h4 className="text-[15px] font-bold text-gray-800 mt-2">
                    {selectedQuestion.question}
                  </h4>
               </div>

               <hr className="border-gray-200" />

               <div className="bg-blue-50 border border-blue-200 p-4 rounded text-sm text-gray-800 whitespace-pre-wrap">
                  <span className="block text-[12px] font-bold text-blue-700 uppercase mb-2">해설 내용</span>
                  {selectedQuestion.explanation}
               </div>
            </div>

            <div className="p-4 border-t border-gray-200 bg-white">
               <button 
                 onClick={() => setSelectedQuestionId(null)}
                 className="w-full py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors"
               >
                 닫기
               </button>
            </div>

          </div>
        </>
      )}

    </div>
  );
}
