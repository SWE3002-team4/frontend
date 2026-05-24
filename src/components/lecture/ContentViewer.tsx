import React from 'react';

interface ContentViewerProps {
  viewMode: 'pdf' | 'summary';
  pdfUrl: string;
  summaryText: string;
}

export function ContentViewer({ viewMode, pdfUrl, summaryText }: ContentViewerProps) {
  
  // +renderPDF()
  const renderPDF = () => {
    return (
      <div className="flex-1 w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400 p-6">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="64" 
          height="64" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="mb-4 text-gray-300"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
        <span className="text-xl font-bold tracking-widest text-gray-400 mb-2">PDF 원본 문서</span>
        <p className="text-xs text-gray-400 font-mono max-w-sm text-center truncate">
          {pdfUrl}
        </p>
      </div>
    );
  };

  // +renderSummary()
  const renderSummary = () => {
    return (
      <div className="flex-1 w-full h-full p-6 overflow-y-auto text-gray-700 bg-white font-sans text-left leading-relaxed">
        {summaryText.split('\n').map((line, index) => {
          const trimmed = line.trim();
          if (trimmed.startsWith('-')) {
            return (
              <div key={index} className="pl-4 my-1.5 flex items-start gap-1.5">
                <span className="text-blue-500 mt-1.5 select-none text-[10px]">•</span>
                <p className="text-sm text-gray-600 flex-1">{trimmed.substring(1).trim()}</p>
              </div>
            );
          }
          if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
            return (
              <h3 key={index} className="text-base font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4 mt-2">
                {trimmed.replace('[', '').replace(']', '').trim()}
              </h3>
            );
          }
          if (trimmed.match(/^\d+\./)) {
            return (
              <h4 key={index} className="text-sm font-bold text-gray-800 mt-4 mb-2">
                {trimmed}
              </h4>
            );
          }
          return trimmed ? (
            <p key={index} className="text-sm text-gray-600 my-2">
              {trimmed}
            </p>
          ) : <div key={index} className="h-2" />;
        })}
      </div>
    );
  };

  return (
    <div className="flex-1 rounded border border-gray-300 bg-white shadow-sm flex flex-col overflow-hidden relative">
      {viewMode === 'pdf' ? renderPDF() : renderSummary()}
    </div>
  );
}
