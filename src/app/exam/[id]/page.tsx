"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// Mock Quiz Config
const MOCK_QUIZ = {
  title: '소프트웨어공학개론 제 1회 모의고사',
  subjectId: '1',
  questions: [
    {
      id: 1,
      type: 'single', 
      difficulty: '하',
      question: '다음 중 소프트웨어 생명주기 모델이 아닌 것은 무엇입니까?',
      options: ['폭포수 모델', '나선형 모델', 'V 모델', '피라미드 모델'],
      correctAnswer: '피라미드 모델',
      keywords: ['소프트웨어 생명주기', '기초개념']
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
      keywords: ['Agile 방법론', '소프트웨어 방법론']
    },
    {
      id: 3,
      type: 'short', 
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

  const calculateResult = () => {
    let correctCount = 0;
    let weightedScore = 0;
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
    const finalStrongKw = strongKw.filter(kw => !weakKwSet.has(kw));

    const finalScore = Math.round((weightedScore / totalWeight) * 100);
    return { correctCount, finalScore, strongKw: finalStrongKw, weakKw };
  };

  // 1. Intro View
  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white border border-gray-200 shadow-sm rounded p-8 text-center">
           <h1 className="text-2xl font-bold text-gray-800 mb-4">
             {MOCK_QUIZ.title}
           </h1>
           <p className="text-gray-600 mb-8">
             지금까지 학습한 내용을 점검하는 테스트입니다.<br/>
             총 {MOCK_QUIZ.questions.length}문제가 출제됩니다.
           </p>

           <div className="flex items-center justify-center gap-3">
              <Link href={`/subject/${MOCK_QUIZ.subjectId}`} className="px-4 py-2 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50 transition-colors font-medium">
                취소 및 돌아가기
              </Link>
              <button 
                onClick={() => setStep('quiz')}
                className="px-6 py-2 rounded font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                퀴즈 시작하기
              </button>
           </div>
        </div>
      </div>
    );
  }

  // 3. Result View
  if (step === 'result') {
    const { correctCount, finalScore, strongKw, weakKw } = calculateResult();

    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white border border-gray-200 shadow-sm rounded p-8 text-center">
           
           <h2 className="text-2xl font-bold text-gray-800 mb-2">테스트 완료!</h2>
           <p className="text-gray-500 mb-8">수고하셨습니다. 모든 문제를 풀었습니다.</p>

           <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="border border-gray-200 rounded p-6 bg-gray-50 flex flex-col items-center justify-center">
                 <span className="text-gray-500 font-bold mb-1 uppercase text-sm">정답 수</span>
                 <div className="text-2xl font-bold text-gray-800">
                   {correctCount} / {MOCK_QUIZ.questions.length}
                 </div>
              </div>
              <div className="border border-blue-200 rounded p-6 bg-blue-50 flex flex-col items-center justify-center">
                 <span className="text-blue-600 font-bold mb-1 uppercase text-sm">최종 점수</span>
                 <div className="text-3xl font-bold text-blue-700">
                   {finalScore}<span className="text-lg">점</span>
                 </div>
              </div>
           </div>

           <div className="border border-gray-200 rounded p-6 text-left space-y-4 mb-8">
              <div>
                <h3 className="text-sm font-bold text-gray-700 mb-2">강한 키워드</h3>
                <div className="flex flex-wrap gap-2">
                  {strongKw.length > 0 ? strongKw.map((kw, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">{kw}</span>
                  )) : <span className="text-gray-500 text-xs">해당 없음</span>}
                </div>
              </div>
              <hr className="border-gray-200" />
              <div>
                <h3 className="text-sm font-bold text-gray-700 mb-2">약점을 보인 키워드</h3>
                <div className="flex flex-wrap gap-2">
                  {weakKw.length > 0 ? weakKw.map((kw, i) => (
                    <span key={i} className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold">{kw}</span>
                  )) : <span className="text-gray-500 text-xs">해당 없음</span>}
                </div>
              </div>
           </div>

           <Link 
             href={`/subject/${MOCK_QUIZ.subjectId}`}
             className="inline-block px-6 py-2 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50 transition-colors font-medium"
           >
             대시보드로 돌아가기
           </Link>
        </div>
      </div>
    );
  }

  // 2. Quiz View
  const question = MOCK_QUIZ.questions[currentQuestionIndex];
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      
      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
        
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <h1 className="text-sm font-bold text-gray-600">{MOCK_QUIZ.title}</h1>
          <span className="text-sm font-bold text-gray-500">{currentQuestionIndex + 1} / {MOCK_QUIZ.questions.length}</span>
        </div>
        
        <div className="p-8">
           <div className="flex gap-4 mb-6">
              <span className="text-2xl font-bold text-blue-600">
                {currentQuestionIndex + 1}.
              </span>
              <div className="flex-1">
                 <h2 className="text-lg font-bold text-gray-800 mb-4">
                   {question.question}
                 </h2>
                 
                 <div className="flex gap-2 mb-6">
                    <span className="px-2 py-1 bg-gray-200 rounded text-xs font-bold text-gray-700">
                      {question.type === 'single' ? '단일선택 객관식' : question.type === 'multiple' ? '다중선택 객관식' : '단답형'}
                    </span>
                    <span className="px-2 py-1 bg-gray-200 rounded text-xs font-bold text-gray-700">
                      난이도: <span className={question.difficulty === '상' ? 'text-red-600' : question.difficulty === '하' ? 'text-green-600' : 'text-blue-600'}>{question.difficulty}</span>
                    </span>
                 </div>
                 
                 <div className="space-y-3">
                   {question.type === 'single' && question.options?.map((opt, i) => {
                     const isSelected = answers[question.id] === opt;
                     return (
                       <button 
                         key={i} 
                         onClick={() => handleSelectSingle(question.id, opt)}
                         className={`w-full flex items-center gap-3 p-3 rounded border text-left transition-colors ${isSelected ? 'bg-blue-50 border-blue-500 text-blue-800 font-semibold' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                       >
                          <input type="radio" checked={isSelected} readOnly className="mt-0.5" />
                          <span className="text-sm">{opt}</span>
                       </button>
                     )
                   })}

                   {question.type === 'multiple' && question.options?.map((opt, i) => {
                     const isChecked = answers[question.id]?.includes(opt);
                     return (
                       <button 
                         key={i} 
                         onClick={() => handleSelectMultiple(question.id, opt)}
                         className={`w-full flex items-center gap-3 p-3 rounded border text-left transition-colors ${isChecked ? 'bg-blue-50 border-blue-500 text-blue-800 font-semibold' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                       >
                          <input type="checkbox" checked={isChecked} readOnly className="mt-0.5" />
                          <span className="text-sm">{opt}</span>
                       </button>
                     )
                   })}

                   {question.type === 'short' && (
                      <textarea 
                         rows={3}
                         value={answers[question.id] || ''}
                         onChange={(e) => handleShortAnswer(question.id, e.target.value)}
                         placeholder="정답을 입력하세요"
                         className="w-full px-3 py-2 bg-white border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded text-gray-900 outline-none text-sm resize-none transition-colors"
                      />
                   )}
                 </div>
              </div>
           </div>

           <div className="border-t border-gray-200 mt-8 pt-4 flex justify-end">
              <button 
                onClick={handleNext} 
                disabled={!answers[question.id] || answers[question.id].length === 0}
                className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 rounded font-medium transition-colors"
              >
                {currentQuestionIndex === MOCK_QUIZ.questions.length - 1 ? '제출 및 결과 보기' : '다음 문제'}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
