"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// Mock Config for Review
const MOCK_REVIEW_DATA = {
  title: '소프트웨어공학개론 제 1회 모의고사',
  subjectId: '1',
  score: 66, // 3개중 2개 맞춤 (부분점수 등 감안 임의 점수)
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
      userAnswer: 'ocp', // 맞음 (대소문자 구별없이 정답처리됨)
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
    <div className="min-h-screen bg-[#09090b] text-zinc-50 font-sans selection:bg-indigo-500/30 flex flex-col overflow-hidden">
      
      {/* Top Header */}
      <header className="flex-none px-8 py-5 border-b border-white/[0.05] bg-[#09090b] z-20 relative">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
           <div className="flex items-center gap-4">
             <Link href={`/subject/${MOCK_REVIEW_DATA.subjectId}`} className="text-zinc-400 hover:text-white transition-colors p-1 bg-white/[0.03] rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:-translate-x-1 transition-transform">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
             </Link>
             <h1 className="text-[20px] font-semibold tracking-tight text-white flex items-center gap-3">
                {MOCK_REVIEW_DATA.title}
                <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 text-[12px] rounded-md tracking-wider">풀이기록</span>
             </h1>
           </div>
           
           <div className="text-[17px] font-medium text-zinc-300">
             최종 점수: <span className="text-white font-bold text-[22px] ml-1">{MOCK_REVIEW_DATA.score}</span>점
           </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto relative p-8">
         <div className="max-w-4xl mx-auto space-y-6 pb-20">
            
            {MOCK_REVIEW_DATA.questions.map((q, idx) => (
               <div 
                 key={q.id}
                 onClick={() => setSelectedQuestionId(q.id)}
                 className={`group relative w-full bg-[#0c0c0e] border ${q.isCorrect ? 'border-cyan-500/20 hover:border-cyan-500/50' : 'border-rose-500/20 hover:border-rose-500/50'} rounded-2xl p-8 cursor-pointer transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden`}
               >
                  {/* Subtle Background Glow indicating correct/incorrect */}
                  <div className={`absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 pointer-events-none transition-opacity group-hover:opacity-20 ${q.isCorrect ? 'bg-cyan-500' : 'bg-rose-500'}`}/>

                  <div className="relative z-10 flex gap-6">
                     
                     {/* Question Number & Status Icon */}
                     <div className="flex flex-col items-center gap-2 mt-1">
                        <span className="text-3xl font-light text-zinc-400 font-mono tracking-tighter">
                          {idx + 1}.
                        </span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${q.isCorrect ? 'border-cyan-500/50 text-cyan-400 bg-cyan-500/10' : 'border-rose-500/50 text-rose-400 bg-rose-500/10'}`}>
                           {q.isCorrect ? (
                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                           ) : (
                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                           )}
                        </div>
                     </div>

                     <div className="flex-1">
                        {/* Question Title & Keyword */}
                        <div className="mb-6 flex items-start justify-between gap-4">
                           <h2 className="text-[20px] font-medium leading-relaxed text-zinc-100 pr-10">
                             {q.question}
                           </h2>
                           <div className="flex flex-wrap gap-2 justify-end pr-2">
                             {q.keywords.map((kw, i) => (
                               <span key={i} className="shrink-0 px-3 py-1 bg-white/[0.05] border border-white/[0.08] text-zinc-400 rounded-lg text-[12px] font-medium whitespace-nowrap">
                                 {kw}
                               </span>
                             ))}
                           </div>
                        </div>

                        {/* Options Read-Only Render */}
                        <div className="space-y-3 relative z-10">
                           
                           {/* Single Choice Review */}
                           {q.type === 'single' && q.options?.map((opt, i) => {
                             const isCorrectAnswer = opt === q.correctAnswer;
                             const isUserAnswer = opt === q.userAnswer;
                             
                             let optClass = "bg-white/[0.02] border border-white/[0.05] text-zinc-400";
                             let iconClass = "border-zinc-600";
                             let label = "";

                             if (isCorrectAnswer) {
                               optClass = "bg-cyan-500/10 border-cyan-500/50 text-cyan-200 shadow-sm";
                               iconClass = "border-cyan-400 bg-cyan-500/20";
                               label = "정답";
                             } else if (!isCorrectAnswer && isUserAnswer) {
                               optClass = "bg-rose-500/10 border-rose-500/50 text-rose-200 shadow-sm";
                               iconClass = "border-rose-400 bg-rose-500/20";
                               label = "내 선택";
                             }

                             return (
                               <div key={i} className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${optClass}`}>
                                  <div className="flex items-center gap-4">
                                     <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center ${iconClass}`}>
                                        {(isUserAnswer || isCorrectAnswer) && <div className={`w-2.5 h-2.5 rounded-full ${isCorrectAnswer ? 'bg-cyan-400' : 'bg-rose-400'}`} />}
                                     </div>
                                     <span className={`text-[15px] ${isCorrectAnswer || isUserAnswer ? 'font-medium' : ''}`}>{opt}</span>
                                  </div>
                                  {label && <span className={`text-[12px] font-bold tracking-wider px-2 py-1 rounded-md ${isCorrectAnswer ? 'bg-cyan-500/20 text-cyan-300' : 'bg-rose-500/20 text-rose-300'}`}>{label}</span>}
                               </div>
                             );
                           })}

                           {/* Multiple Choice Review */}
                           {q.type === 'multiple' && q.options?.map((opt, i) => {
                             const isCorrectAnswer = (q.correctAnswer as string[]).includes(opt);
                             const isUserAnswer = (q.userAnswer as string[]).includes(opt);
                             
                             let optClass = "bg-white/[0.02] border border-white/[0.05] text-zinc-400";
                             let iconClass = "border-zinc-600";
                             let label = "";

                             if (isCorrectAnswer && isUserAnswer) {
                               optClass = "bg-cyan-500/10 border-cyan-500/50 text-cyan-200";
                               iconClass = "border-cyan-400 bg-cyan-400 text-black";
                               label = "정답 (맞춤)";
                             } else if (isCorrectAnswer && !isUserAnswer) {
                               optClass = "bg-cyan-500/5 border-cyan-500/30 text-cyan-200/70";
                               iconClass = "border-cyan-400/50 bg-cyan-500/10 text-cyan-400";
                               label = "정답 (미선택)";
                             } else if (!isCorrectAnswer && isUserAnswer) {
                               optClass = "bg-rose-500/10 border-rose-500/50 text-rose-200";
                               iconClass = "border-rose-400 bg-rose-400 text-black";
                               label = "오답 선택";
                             }

                             return (
                               <div key={i} className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${optClass}`}>
                                  <div className="flex items-center gap-4">
                                     <div className={`w-5 h-5 flex items-center justify-center rounded-[5px] border-[1.5px] ${iconClass}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                     </div>
                                     <span className="text-[15px]">{opt}</span>
                                  </div>
                                  {label && <span className={`text-[12px] font-bold tracking-wider px-2 py-1 rounded-md opacity-90`}>{label}</span>}
                               </div>
                             );
                           })}

                           {/* Short Answer Review */}
                           {q.type === 'short' && (
                              <div className="flex flex-col md:flex-row gap-4">
                                 <div className="flex-1 bg-white/[0.02] border border-white/[0.05] rounded-xl p-5">
                                    <span className="block text-[12px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">내가 제출한 답</span>
                                    <div className={`text-[16px] font-medium max-w-full overflow-hidden text-ellipsis ${q.isCorrect ? 'text-cyan-300' : 'text-rose-300'}`}>
                                       {q.userAnswer as string} 
                                    </div>
                                 </div>
                                 <div className="flex-1 bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-5">
                                    <span className="block text-[12px] font-semibold text-cyan-500/70 uppercase tracking-widest mb-2">실제 정답</span>
                                    <div className="text-[16px] font-bold text-cyan-200">
                                       {q.correctAnswer as string} 
                                    </div>
                                 </div>
                              </div>
                           )}

                        </div>

                        {/* Slide Indicator */}
                        <div className="mt-8 flex justify-end text-zinc-500 text-[13px] font-medium items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                           클릭하여 해설 보기
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="-rotate-45"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </div>
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
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedQuestionId(null)}
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm md:max-w-md bg-[#111113] border-l border-white/[0.1] shadow-2xl flex flex-col transform transition-transform duration-300 ease-out animate-in slide-in-from-right-full">
            
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.05]">
               <h3 className="text-[16px] font-semibold text-white tracking-wider flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                 문제 해설
               </h3>
               <button onClick={() => setSelectedQuestionId(null)} className="p-2 hover:bg-white/[0.05] rounded-full transition-colors text-zinc-400 hover:text-white">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
               </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
               <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                     {selectedQuestion.keywords.map((kw, i) => (
                       <span key={i} className="text-[12px] bg-white/[0.05] border border-white/[0.08] px-2.5 py-1 rounded-md text-zinc-400 font-medium inline-block">
                         # {kw}
                       </span>
                     ))}
                  </div>
                  <h4 className="text-[16px] leading-relaxed text-zinc-200 mt-2">
                    {selectedQuestion.question}
                  </h4>
               </div>

               <div className="w-full h-px bg-white/[0.05]" />

               <div className="bg-white/[0.02] border border-white/[0.08] p-6 rounded-2xl leading-loose text-[15px] text-zinc-300 whitespace-pre-wrap shadow-inner">
                  <span className="block text-[13px] font-semibold text-indigo-400 uppercase tracking-widest mb-4">해설 내용</span>
                  {selectedQuestion.explanation}
               </div>
            </div>

            <div className="p-6 border-t border-white/[0.05] bg-[#0c0c0e]">
               <button 
                 onClick={() => setSelectedQuestionId(null)}
                 className="w-full py-4 text-[15px] font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
               >
                 확인했습니다
               </button>
            </div>

          </div>
        </>
      )}

    </div>
  );
}
