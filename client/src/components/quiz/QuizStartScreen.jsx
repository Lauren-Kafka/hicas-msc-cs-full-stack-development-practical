export function QuizStartScreen({ title, description, questionCount, onStart }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-16 text-center animate-slide-up relative z-10 bg-white">
      
      {/* Icon Replacement: A very clean minimalist bracket or book representation */}
      <div className="mb-10 flex items-center justify-center w-16 h-16 bg-[#fafafa] border border-[#eaeaea] rounded shadow-sm text-2xl font-mono text-[#444] tracking-tighter">
        {"{ }"}
      </div>
      
      <h1 className="text-3xl sm:text-4xl font-bold text-[#111] mb-4 tracking-tight leading-tight">
        {title}
      </h1>
      
      <p className="text-base text-[#666] mb-12 max-w-lg leading-relaxed">
        {description}
      </p>

      {/* Stats container */}
      <div className="flex flex-wrap items-center justify-center gap-6 mb-14 w-full">
        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#888] mb-1">Items</span>
          <span className="font-mono text-sm font-medium text-[#111] bg-[#f5f5f5] px-3 py-1 rounded border border-[#eaeaea]">{questionCount} Questions</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#888] mb-1">Constraint</span>
          <span className="font-mono text-sm font-medium text-[#111] bg-[#f5f5f5] px-3 py-1 rounded border border-[#eaeaea]">Untimed</span>
        </div>
      </div>

      <button 
        onClick={onStart}
        className="w-full sm:w-auto relative rounded bg-[#111] border border-[#111] px-10 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-white hover:text-[#111] active:translate-y-[1px]"
      >
        <span className="flex items-center justify-center gap-2">
          Start Assessment
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
            <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
          </svg>
        </span>
      </button>

      {/* Very minimal footer text */}
      <div className="absolute bottom-8 text-[11px] text-[#999] font-mono uppercase tracking-widest">
        React Capabilities Test
      </div>
    </div>
  );
}
