import { BookOpen, Sparkles, Timer } from 'lucide-react';

export function QuizStartScreen({ title, description, questionCount, onStart }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-16 text-center animate-slide-up relative z-10">
      
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[400px] max-h-[400px] bg-primary-200/50 rounded-full blur-[80px] -z-10 animate-pulse"></div>

      <div className="relative mb-10 group">
        <div className="absolute inset-0 bg-primary-200 rounded-3xl rotate-6 transition-transform group-hover:rotate-12 duration-300"></div>
        <div className="absolute inset-0 bg-primary-100 rounded-3xl -rotate-6 transition-transform group-hover:-rotate-12 duration-300"></div>
        <div className="relative w-24 h-24 bg-white border border-primary-50 rounded-3xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
          <BookOpen className="w-12 h-12 text-primary-600" />
        </div>
      </div>
      
      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
        {title}
      </h1>
      
      <p className="text-lg text-slate-600 mb-12 max-w-xl leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 mb-14 w-full">
        <div className="flex items-center gap-2.5 px-6 py-3 bg-white/60 backdrop-blur-md rounded-2xl border border-slate-200/60 shadow-sm">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span className="font-semibold text-slate-700">{questionCount} Questions</span>
        </div>
        <div className="flex items-center gap-2.5 px-6 py-3 bg-white/60 backdrop-blur-md rounded-2xl border border-slate-200/60 shadow-sm">
          <Timer className="w-5 h-5 text-primary-500" />
          <span className="font-semibold text-slate-700">Untimed</span>
        </div>
      </div>

      <button 
        onClick={onStart}
        className="group relative overflow-hidden rounded-2xl bg-slate-900 px-10 py-5 text-xl font-bold text-white shadow-xl shadow-slate-900/20 transition-all hover:shadow-slate-900/40 hover:-translate-y-1 active:scale-95 flex items-center justify-center min-w-[280px]"
      >
        <span className="relative z-10 flex items-center gap-3">
          Begin Assessment
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
      </button>
    </div>
  );
}
