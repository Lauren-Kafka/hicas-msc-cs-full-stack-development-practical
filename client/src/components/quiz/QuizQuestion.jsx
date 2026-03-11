import { useState, useEffect } from 'react';

export function QuizQuestion({ questionData, currentIndex, totalQuestions, onAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null);
  
  // Progress computation
  const progressPercentage = ((currentIndex) / totalQuestions) * 100;

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
  }, [questionData.id]);

  const handleNext = () => {
    if (selectedOption !== null) {
      onAnswer(selectedOption);
    }
  };

  const hasAnswered = selectedOption !== null;
  const isCorrectlyAnswered = selectedOption === questionData.correctAnswerIndex;

  return (
    <div className="flex-1 flex flex-col w-full h-full relative bg-white">
      {/* Progress Header */}
      <div className="w-full border-b border-[#eaeaea] p-6 lg:p-8 flex flex-col gap-5 bg-[#fafafa]">
        <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest text-[#666]">
          <span>{String(currentIndex + 1).padStart(2, '0')} / {String(totalQuestions).padStart(2, '0')}</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full h-[2px] bg-[#eaeaea]">
          <div 
            className="h-full bg-[#111] transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 p-6 lg:p-10 pb-32 overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-medium text-[#111] mb-10 leading-relaxed font-sans animate-slide-up tracking-tight">
          {questionData.question}
        </h2>

        {/* Options */}
        <div className="flex flex-col gap-3 w-full">
          {questionData.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrectOption = index === questionData.correctAnswerIndex;
            
            // Determine styling based on state
            let containerStyle = 'border border-[#eaeaea] hover:border-[#111] bg-white';
            let letterStyle = 'bg-[#f5f5f5] text-[#888]';
            let textStyle = 'text-[#333]';
            
            if (hasAnswered) {
              if (isCorrectOption) {
                containerStyle = 'border border-[#0070f3] bg-[#0070f3] bg-opacity-[0.03]';
                letterStyle = 'bg-[#0070f3] text-white';
                textStyle = 'text-[#0070f3] font-medium';
              } else if (isSelected && !isCorrectOption) {
                containerStyle = 'border border-[#e00] bg-[#e00] bg-opacity-[0.03]';
                letterStyle = 'bg-[#e00] text-white';
                textStyle = 'text-[#e00] line-through opacity-80';
              } else {
                containerStyle = 'border border-[#eaeaea] opacity-50 bg-[#fafafa]';
                letterStyle = 'bg-[#f5f5f5] text-[#999]';
              }
            } else if (isSelected) {
              containerStyle = 'border border-[#111] bg-[#111] shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]';
              letterStyle = 'bg-white text-[#111]';
              textStyle = 'text-white font-medium';
            }

            return (
              <button
                key={index}
                disabled={hasAnswered}
                onClick={() => setSelectedOption(index)}
                className={`w-full text-left p-4 rounded transition-all duration-200 ease-out flex items-center justify-between group ${containerStyle}`}
              >
                <div className="flex items-center gap-4">
                  {/* Option letter box (A, B, C...) */}
                  <div className={`w-8 h-8 shrink-0 rounded flex items-center justify-center font-mono text-xs font-medium transition-colors ${letterStyle}`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  
                  <span className={`text-sm sm:text-base ${textStyle}`}>
                    {option}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation shown after answering */}
        {hasAnswered && (
          <div className="mt-12 pt-8 border-t border-[#eaeaea] animate-slide-up">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#888] mb-3">
              {isCorrectlyAnswered ? 'Status: Correct' : 'Status: Incorrect'}
            </h4>
            <div className={`p-4 rounded border text-sm leading-relaxed ${isCorrectlyAnswered ? 'bg-[#0070f3] bg-opacity-[0.03] border-[#0070f3] border-opacity-20 text-[#111]' : 'bg-[#e00] bg-opacity-[0.03] border-[#e00] border-opacity-20 text-[#111]'}`}>
              {questionData.explanation}
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="absolute bottom-0 left-0 w-full bg-white border-t border-[#eaeaea] p-6 lg:px-10 flex justify-between items-center shrink-0 rounded-b-xl shadow-[0_-10px_30px_rgba(255,255,255,0.9)]">
        <div className="text-xs text-[#888] font-mono hidden sm:block">
          Select an option to continue
        </div>
        <button
          onClick={handleNext}
          disabled={!hasAnswered}
          className={`relative rounded border px-8 py-2.5 text-sm font-medium transition-all
            ${hasAnswered 
              ? 'bg-[#111] border-[#111] text-white hover:bg-white hover:text-[#111] active:translate-y-[1px]' 
              : 'bg-[#fafafa] border-[#eaeaea] text-[#ccc] cursor-not-allowed'
            }`}
        >
          {currentIndex === totalQuestions - 1 ? 'Complete' : 'Next'}
        </button>
      </div>
    </div>
  );
}
