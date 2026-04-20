"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// Mock Quiz Config
const MOCK_QUIZ = {
  title: '소프트웨어공학개론 제 1회 모의고사',
  subjectId: '1', // 돌아가기용
  questions: [
    {
      id: 1,
      type: 'single', // 단일선택
      difficulty: '하',
      question: '다음 중 소프트웨어 생명주기 모델이 아닌 것은 무엇입니까?',
      options: ['폭포수 모델', '나선형 모델', 'V 모델', '피라미드 모델'],
      correctAnswer: '피라미드 모델',
      keywords: ['소프트웨어 생명주기', '기초개념']
    },
    {
      id: 2,
      type: 'multiple', // 다중선택
      difficulty: '중',
      question: '애자일(Agile) 선언문의 4가지 핵심 기조 중 올바른 것을 모두 고르시오.',
      options: [
        '공정이나 도구보다 개인과 상호작용', 
        '포괄적인 문서보다 정상적으로 작동하는 소프트웨어', 
        '고객 협력보다 계약 협상', 
        '변화에 대응하기보다 계획 따르기'
      ],
      correctAnswer: ['공정이나 도구보다 개인과 상호작용', '포괄적인 문서보다 정상적으로 작동하는 소프트웨어'],
      keywords: ['Agile 방법론', '소프트웨어 방법론']
    },
    {
      id: 3,
      type: 'short', // 단답형
      difficulty: '상',
      question: '객체지향 설계 원칙 (SOLID) 중 "소프트웨어 개체는 확장에 대해 열려 있어야 하고, 수정에 대해서는 닫혀 있어야 한다"는 원칙의 영문 약어는 무엇입니까?',
      correctAnswer: 'OCP',
      keywords: ['객체지향 설계 (SOLID)', 'OCP 원칙']
    }
  ]
};

export default function ExamPage() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // 저장된 답변 상태 { 질문id : 답변내용 }
  const [answers, setAnswers] = useState<Record<number, any>>({});

  const handleNext = () => {
    if (currentQuestionIndex < MOCK_QUIZ.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setStep('result');
    }
  };

  const handleSelectSingle = (qId: number, option: string) => {
    setAnswers({ ...answers, [qId]: option });
  };

  const handleSelectMultiple = (qId: number, option: string) => {
    const current = answers[qId] || [];
    if (current.includes(option)) {
      setAnswers({ ...answers, [qId]: current.filter((o: string) => o !== option) });
    } else {
      setAnswers({ ...answers, [qId]: [...current, option] });
    }
  };

  const handleShortAnswer = (qId: number, text: string) => {
    setAnswers({ ...answers, [qId]: text });
  };

  // 결과 계산 (난이도 가중치 반영)
  const calculateResult = () => {
    let correctCount = 0;
    let weightedScore = 0;
    
    // 난이도별 가중치 계수
    const weights: Record<string, number> = { '하': 1, '중': 2, '상': 3 };
    let totalWeight = 0;

    const strongKwSet = new Set<string>();
    const weakKwSet = new Set<string>();

    MOCK_QUIZ.questions.forEach(q => {
      totalWeight += weights[q.difficulty];
      
      let isCorrect = false;
      if (q.type === 'single') {
        isCorrect = answers[q.id] === q.correctAnswer;
      } else if (q.type === 'multiple') {
        const userAns = answers[q.id] || [];
        const correctAns = q.correctAnswer as string[];
        isCorrect = userAns.length === correctAns.length && userAns.every((val:string) => correctAns.includes(val));
      } else if (q.type === 'short') {
        const userAns = (answers[q.id] || '').trim().toLowerCase();
        const correctAns = (q.correctAnswer as string).toLowerCase();
        isCorrect = userAns === correctAns;
      }

      if (isCorrect) {
        correctCount++;
        weightedScore += weights[q.difficulty];
        q.keywords.forEach(kw => strongKwSet.add(kw));
      } else {
        q.keywords.forEach(kw => weakKwSet.add(kw));
      }
    });

    const strongKw = Array.from(strongKwSet);
    let weakKw = Array.from(weakKwSet);
    // 동일 키워드가 맞잡이/오답 섞여있다면 약점이 우선
    const finalStrongKw = strongKw.filter(kw => !weakKwSet.has(kw));

    const finalScore = Math.round((weightedScore / totalWeight) * 100);
    return { correctCount, finalScore, strongKw: finalStrongKw, weakKw };
  };

  // -------------------------
  // 1. Intro View
  // -------------------------
  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-6 text-zinc-50 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="relative w-full max-w-2xl bg-[#0c0c0e]/80 border border-white/[0.08] backdrop-blur-2xl shadow-2xl rounded-3xl p-12 text-center animate-in fade-in zoom-in-95 duration-500">
           <div className="w-20 h-20 mx-auto bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
                 <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/>
              </svg>
           </div>
           
           <h1 className="text-3xl font-semibold tracking-tight text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
             {MOCK_QUIZ.title}
           </h1>
           <p className="text-zinc-400 text-[16px] leading-relaxed mb-10 max-w-md mx-auto">
             지금까지 학습한 내용을 점검하는 테스트입니다.<br/>
             총 {MOCK_QUIZ.questions.length}문제가 출제되며, 난이도에 따라 가중치가 부여됩니다.
           </p>

           <div className="flex items-center justify-center gap-4">
              <Link href={`/subject/${MOCK_QUIZ.subjectId}`} className="px-6 py-3.5 rounded-xl text-[15px] font-medium text-zinc-300 hover:bg-white/[0.05] transition-colors">
                돌아가기
              </Link>
              <button 
                onClick={() => setStep('quiz')}
                className="px-8 py-3.5 rounded-xl text-[16px] font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 active:scale-95 flex items-center gap-2"
              >
                퀴즈 시작하기
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
           </div>
        </div>
      </div>
    );
  }

  // -------------------------
  // 3. Result View
  // -------------------------
  if (step === 'result') {
    const { correctCount, finalScore, strongKw, weakKw } = calculateResult();

    return (
      <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-6 text-zinc-50 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="relative w-full max-w-2xl bg-[#0c0c0e]/90 border border-white/[0.08] backdrop-blur-3xl shadow-2xl rounded-3xl p-12 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
           
           <h2 className="text-3xl font-semibold mb-2">테스트 완료! 🎉</h2>
           <p className="text-zinc-400 mb-10">수고하셨습니다. 모든 문제를 풀었습니다.</p>

           <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 flex flex-col items-center justify-center">
                 <span className="text-zinc-500 font-medium mb-2 uppercase tracking-widest text-[12px]">정답 수</span>
                 <div className="text-3xl font-bold font-mono">
                   {correctCount} <span className="text-lg text-zinc-500">/ {MOCK_QUIZ.questions.length}</span>
                 </div>
              </div>
              <div className="bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 border border-indigo-500/20 rounded-2xl p-6 flex flex-col items-center justify-center">
                 <span className="text-indigo-300 font-medium mb-2 uppercase tracking-widest text-[12px]">최종 점수 (가중치 반영)</span>
                 <div className="text-4xl font-bold font-mono text-white">
                   {finalScore}<span className="text-xl text-indigo-300/50">점</span>
                 </div>
              </div>
           </div>

           <div className="bg-black/40 border border-white/[0.05] rounded-2xl p-6 text-left space-y-6 mb-10">
              <div>
                <h3 className="text-[13px] font-semibold text-zinc-400 tracking-wider mb-3">발견된 강한 키워드</h3>
                <div className="flex flex-wrap gap-2">
                  {strongKw.length > 0 ? strongKw.map((kw, i) => (
                    <span key={i} className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-lg text-sm">{kw}</span>
                  )) : <span className="text-zinc-500 text-sm">해당 없음</span>}
                </div>
              </div>
              <div className="w-full h-px bg-white/[0.05]" />
              <div>
                <h3 className="text-[13px] font-semibold text-zinc-400 tracking-wider mb-3">보완이 필요한 약한 키워드</h3>
                <div className="flex flex-wrap gap-2">
                  {weakKw.length > 0 ? weakKw.map((kw, i) => (
                    <span key={i} className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-lg text-sm">{kw}</span>
                  )) : <span className="text-zinc-500 text-sm">해당 없음</span>}
                </div>
              </div>
           </div>

           <Link 
             href={`/subject/${MOCK_QUIZ.subjectId}`}
             className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-[16px] font-medium text-white bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.1] hover:border-white/[0.2] transition-colors"
           >
             대시보드로 돌아가기
           </Link>

        </div>
      </div>
    );
  }

  // -------------------------
  // 2. Quiz View
  // -------------------------
  const question = MOCK_QUIZ.questions[currentQuestionIndex];
  
  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-6 text-zinc-50 relative overflow-hidden">
      
      <div className="w-full max-w-[800px] bg-[#0c0c0e] border border-white/[0.08] rounded-[24px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        
        {/* Header - 과목명 및 퀴즈 타이틀 (스케치 상단 영역) */}
        <div className="px-8 py-5 border-b border-white/[0.08] bg-[#111113]/80 flex items-center justify-between">
          <h1 className="text-[15px] font-medium tracking-wide text-zinc-300">{MOCK_QUIZ.title}</h1>
          <span className="text-sm font-mono text-zinc-500">{currentQuestionIndex + 1} / {MOCK_QUIZ.questions.length}</span>
        </div>
        
        {/* Question Area */}
        <div className="p-10 pb-12">
           <div className="flex gap-6">
              {/* Question Number */}
              <span className="text-4xl font-light text-indigo-400 mt-1 font-mono tracking-tighter">
                {currentQuestionIndex + 1}.
              </span>
              
              <div className="flex-1">
                 {/* Question Text */}
                 <h2 className="text-[22px] font-light leading-relaxed text-zinc-100 mb-5">
                   {question.question}
                 </h2>
                 
                 {/* Tags (스케치 반영) */}
                 <div className="flex gap-3 mb-10">
                    <span className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-[13px] font-medium text-zinc-400">
                      유형: {question.type === 'single' ? '단일선택 객관식' : question.type === 'multiple' ? '다중선택 객관식' : '단답형'}
                    </span>
                    <span className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-[13px] font-medium text-zinc-400">
                      난이도: <span className={question.difficulty === '상' ? 'text-rose-400' : question.difficulty === '하' ? 'text-cyan-400' : 'text-amber-400'}>{question.difficulty}</span>
                    </span>
                 </div>
                 
                 {/* Answer Options Context */}
                 <div className="space-y-3.5">
                   
                   {/* 단일 선택 UI */}
                   {question.type === 'single' && question.options?.map((opt, i) => {
                     const isSelected = answers[question.id] === opt;
                     return (
                       <button 
                         key={i} 
                         onClick={() => handleSelectSingle(question.id, opt)}
                         className={`w-full flex items-center gap-4 p-4.5 rounded-xl border-2 text-left transition-all duration-200 ${isSelected ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-100 shadow-md shadow-indigo-500/10' : 'bg-white/[0.01] border-white/[0.05] text-zinc-300 hover:bg-white/[0.03] hover:border-white/[0.1]'}`}
                       >
                          <div className={`shrink-0 w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${isSelected ? 'border-indigo-400 bg-indigo-500/20' : 'border-zinc-500'}`}>
                             {isSelected && <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full" />}
                          </div>
                          <span className="text-[16px] xl:text-[17px]">{opt}</span>
                       </button>
                     )
                   })}

                   {/* 다중 선택 UI */}
                   {question.type === 'multiple' && question.options?.map((opt, i) => {
                     const isChecked = answers[question.id]?.includes(opt);
                     return (
                       <button 
                         key={i} 
                         onClick={() => handleSelectMultiple(question.id, opt)}
                         className={`w-full flex items-center gap-4 p-4.5 rounded-xl border-2 text-left transition-all duration-200 ${isChecked ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-100 shadow-md shadow-indigo-500/10' : 'bg-white/[0.01] border-white/[0.05] text-zinc-300 hover:bg-white/[0.03] hover:border-white/[0.1]'}`}
                       >
                          <div className={`shrink-0 w-5 h-5 border-[1.5px] rounded-[5px] flex items-center justify-center transition-colors ${isChecked ? 'border-indigo-400 bg-indigo-400 text-black' : 'border-zinc-500 text-transparent'}`}>
                             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          </div>
                          <span className="text-[16px] xl:text-[17px]">{opt}</span>
                       </button>
                     )
                   })}

                   {/* 단답형 UI */}
                   {question.type === 'short' && (
                      <div className="pt-2">
                        <textarea 
                           rows={3}
                           value={answers[question.id] || ''}
                           onChange={(e) => handleShortAnswer(question.id, e.target.value)}
                           placeholder="정답을 자유롭게 입력하세요"
                           className="w-full px-5 py-4 bg-black/40 border border-white/[0.1] focus:border-indigo-500/50 focus:bg-white/[0.02] focus:ring-1 focus:ring-indigo-500/50 rounded-xl text-white outline-none transition-all duration-300 text-[16px] xl:text-[17px] resize-none"
                        />
                      </div>
                   )}
                 </div>
              </div>
           </div>

           {/* Footer Action */}
           <div className="mt-14 flex justify-end">
              <button 
                onClick={handleNext} 
                disabled={!answers[question.id] || answers[question.id].length === 0}
                className="px-8 py-3.5 bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-500 rounded-xl font-bold flex items-center gap-2 transition-colors duration-200 active:scale-95"
              >
                {currentQuestionIndex === MOCK_QUIZ.questions.length - 1 ? '제출 및 결과 보기' : '다음 문제'} 
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
           </div>

        </div>
      </div>

    </div>
  );
}
