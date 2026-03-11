import { useState, useEffect } from 'react';
import { ChevronRight, HelpCircle } from 'lucide-react';

export function QuizQuestion({ questionData, currentIndex, totalQuestions, onAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const progressPercentage = ((currentIndex) / totalQuestions) * 100;

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setShowExplanation(false);
  }, [questionData.id]);

  const handleNext = () => {
    if (selectedOption !== null) {
      onAnswer(selectedOption);
    }
  };

  const hasAnswered = selectedOption !== null;
  const isCorrectlyAnswered = selectedOption === questionData.correctAnswerIndex;

  return (
    <div className="flex-1 flex flex-col w-full h-full relative">
      {/* Progress Header */}
      <div className="w-full bg-white/50 backdrop-blur-md border-b border-slate-100 p-6 sm:px-10 flex flex-col gap-4 rounded-t-[2.5rem]">
        <div className="flex justify-between items-center text-sm font-semibold tracking-wide">
          <span className="text-slate-400 uppercase tracking-wider text-xs font-bold">Question {currentIndex + 1} of {totalQuestions}</span>
          <span className="text-primary-600 bg-primary-50 px-3 py-1 rounded-full text-xs font-bold">{Math.round(progressPercentage)}% Complete</span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 p-6 sm:p-10 pb-32 overflow-y-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-10 leading-relaxed animate-slide-up">
          {questionData.question}
        </h2>

        {/* Options */}
        <div className="flex flex-col gap-4 w-full">
          {questionData.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrectOption = index === questionData.correctAnswerIndex;
            
            // Determine styling based on state
            let borderStyle = 'border-slate-200 hover:border-primary-400 hover:bg-primary-50/50';
            let bgStyle = 'bg-white';
            let textStyle = 'text-slate-700';
            
            if (hasAnswered) {
              if (isCorrectOption) {
                borderStyle = 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500 z-10';
                bgStyle = 'bg-emerald-50/50';
                textStyle = 'text-emerald-900 font-semibold';
              } else if (isSelected && !isCorrectOption) {
                borderStyle = 'border-rose-400 text-rose-700 shadow-[0_0_20px_rgba(244,63,94,0.1)]';
                bgStyle = 'bg-rose-50/50';
                textStyle = 'text-rose-900 line-through opacity-80';
              } else {
                borderStyle = 'border-slate-100 opacity-50';
                bgStyle = 'bg-slate-50/50';
              }
            } else if (isSelected) {
              borderStyle = 'border-primary-500 ring-2 ring-primary-500 shadow-[0_0_20px_rgba(99,102,241,0.15)] scale-[1.01] z-10';
              bgStyle = 'bg-white';
            }

            return (
              <button
                key={index}
                disabled={hasAnswered}
                onClick={() => setSelectedOption(index)}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ease-out flex items-center justify-between group ${borderStyle} ${bgStyle}`}
              >
                <div className="flex items-center gap-5">
                  {/* Option letter circle (A, B, C...) */}
                  <div className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center font-black text-sm transition-all duration-300
                    ${hasAnswered ? 
                      (isCorrectOption ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : isSelected ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30' : 'bg-slate-200 text-slate-400') 
                      : isSelected ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30 -translate-y-0.5' : 'bg-slate-100 text-slate-500 group-hover:bg-primary-100 group-hover:text-primary-700'
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  
                  <span className={`text-base sm:text-lg ${textStyle}`}>
                    {option}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation shown after answering */}
        {hasAnswered && (
          <div className={`mt-10 p-6 sm:p-8 rounded-3xl border ${isCorrectlyAnswered ? 'bg-emerald-50/80 border-emerald-200' : 'bg-orange-50/80 border-orange-200'} animate-slide-up backdrop-blur-sm`}>
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-xl shrink-0 ${isCorrectlyAnswered ? 'bg-emerald-100' : 'bg-orange-100'}`}>
                <HelpCircle className={`w-6 h-6 ${isCorrectlyAnswered ? 'text-emerald-600' : 'text-orange-600'}`} />
              </div>
              <div className="pt-1">
                <h4 className={`font-bold uppercase tracking-wider text-sm mb-3 ${isCorrectlyAnswered ? 'text-emerald-800' : 'text-orange-800'}`}>
                  {isCorrectlyAnswered ? 'Correct Answer!' : 'Incorrect'}
                </h4>
                <p className={`text-lg leading-relaxed ${isCorrectlyAnswered ? 'text-emerald-900/80' : 'text-orange-900/80'}`}>
                  {questionData.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="absolute bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-slate-100 p-6 sm:px-10 flex justify-end shrink-0 rounded-b-[2.5rem]">
        <button
          onClick={handleNext}
          disabled={!hasAnswered}
          className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all duration-300
            ${hasAnswered 
              ? 'bg-slate-900 text-white hover:bg-black hover:shadow-xl hover:shadow-slate-900/20 hover:-translate-y-1 active:scale-95 translate-y-0 opacity-100' 
              : 'bg-slate-100 text-slate-400 cursor-not-allowed translate-y-2 opacity-0'
            }`}
        >
          {currentIndex === totalQuestions - 1 ? 'Finish Assessment' : 'Continue'}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
