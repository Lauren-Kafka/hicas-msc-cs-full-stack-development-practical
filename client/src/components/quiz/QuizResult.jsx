import { Trophy, RefreshCcw, Star, XCircle, CheckCircle2 } from 'lucide-react';

export function QuizResult({ score, totalQuestions, history, onRestart }) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = percentage >= 80;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-16 text-center animate-slide-up relative z-10 w-full h-full">
      {/* Background Decor */}
      <div className={`absolute top-0 left-0 w-full h-40 opacity-20 -z-10 rounded-t-[2.5rem] bg-gradient-to-b ${passed ? 'from-emerald-400 to-transparent' : 'from-rose-400 to-transparent'}`}></div>

      {/* Icon */}
      <div className={`w-28 h-28 rounded-3xl flex items-center justify-center mb-8 shadow-2xl relative
        ${passed ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-500/40' : 'bg-gradient-to-br from-rose-400 to-rose-600 shadow-rose-500/40'}`}
      >
        <Trophy className="w-14 h-14 text-white" />
        
        {/* Decorative Stars */}
        {passed && (
          <>
            <Star fill="currentColor" className="absolute -top-5 -right-3 w-8 h-8 text-amber-300 rotate-12 drop-shadow-md animate-pulse" />
            <Star fill="currentColor" className="absolute top-4 -left-8 w-10 h-10 text-amber-300 -rotate-12 drop-shadow-md animate-pulse animation-delay-200" />
            <Star fill="currentColor" className="absolute bottom-2 -right-4 w-6 h-6 text-amber-300 rotate-45 drop-shadow-md animate-pulse animation-delay-100" />
          </>
        )}
      </div>

      <h2 className={`text-4xl sm:text-5xl font-black mb-4 tracking-tight ${passed ? 'text-emerald-900' : 'text-rose-900'}`}>
        {passed ? 'Assessment Passed!' : 'Needs Review'}
      </h2>
      
      <p className="text-xl text-slate-500 mb-10 font-medium">
        Final Score: <span className={`font-black text-2xl ${passed ? 'text-emerald-600' : 'text-rose-600'}`}>{percentage}%</span>
      </p>

      {/* Stats Container */}
      <div className="w-full max-w-lg bg-white/60 backdrop-blur-md rounded-3xl border border-slate-100 shadow-sm p-8 mb-12">
        <div className="grid grid-cols-2 gap-8 divide-x divide-slate-100">
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Total Questions</span>
            <span className="text-3xl font-black text-slate-800">{totalQuestions}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Correct Answers</span>
            <span className={`text-3xl font-black ${passed ? 'text-emerald-500' : 'text-rose-500'}`}>{score}</span>
          </div>
        </div>

        {/* History Dots */}
        <div className="mt-8 pt-8 border-t border-slate-100 flex justify-center flex-wrap gap-3">
          {history.map((isCorrect, i) => (
            <div 
              key={i} 
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm
                ${isCorrect ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}
              title={`Question ${i + 1}: ${isCorrect ? 'Correct' : 'Incorrect'}`}
            >
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onRestart}
        className="group relative px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-900/20 hover:shadow-slate-900/40 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 overflow-hidden min-w-[280px]"
      >
        <RefreshCcw className="w-5 h-5 transition-transform group-hover:-rotate-180 duration-500 ease-in-out" />
        <span className="relative z-10 text-lg">Retake Assessment</span>
      </button>
    </div>
  );
}
