export function QuizResult({ score, totalQuestions, history, onRestart }) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = percentage >= 80;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-16 text-center animate-slide-up bg-white">
      
      {/* Icon Replacement: Minimalist badge */}
      <div className={`w-16 h-16 rounded flex items-center justify-center mb-8 border ${passed ? 'bg-[#0070f3] bg-opacity-[0.03] border-[#0070f3] text-[#0070f3]' : 'bg-[#e00] bg-opacity-[0.03] border-[#e00] text-[#e00]'}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {passed ? (
            <polyline points="20 6 9 17 4 12"></polyline>
          ) : (
            <>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </>
          )}
        </svg>
      </div>

      <h2 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight text-[#111]">
        {passed ? 'Assessment Passed' : 'Assessment Failed'}
      </h2>
      
      <p className="text-[#666] mb-12">
        You scored <span className="font-mono font-medium text-[#111]">{percentage}%</span> on this test
      </p>

      {/* Stats Container */}
      <div className="w-full max-w-sm mb-12">
        <div className="flex flex-col border border-[#eaeaea] rounded overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-[#eaeaea] bg-[#fafafa]">
            <span className="text-sm font-medium text-[#666]">Questions</span>
            <span className="font-mono text-sm text-[#111]">{totalQuestions}</span>
          </div>
          <div className="flex justify-between items-center p-4 border-b border-[#eaeaea] bg-white">
            <span className="text-sm font-medium text-[#666]">Correct</span>
            <span className={`font-mono text-sm ${passed ? 'text-[#0070f3]' : 'text-[#e00]'}`}>{score}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-[#fafafa]">
            <span className="text-sm font-medium text-[#666]">Incorrect</span>
            <span className="font-mono text-sm text-[#111]">{totalQuestions - score}</span>
          </div>
        </div>

        {/* History Dots - extremely minimal */}
        <div className="mt-8 flex justify-center gap-2">
          {history.map((isCorrect, i) => (
            <div 
              key={i} 
              className={`w-8 h-8 rounded flex items-center justify-center border font-mono text-[11px]
                ${isCorrect ? 'border-[#0070f3] border-opacity-30 bg-[#0070f3] bg-opacity-[0.03] text-[#0070f3]' : 'border-[#e00] border-opacity-30 bg-[#e00] bg-opacity-[0.03] text-[#e00]'}`}
              title={`Question ${i + 1}: ${isCorrect ? 'Correct' : 'Incorrect'}`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onRestart}
        className="w-full sm:w-auto rounded bg-[#111] border border-[#111] px-10 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-white hover:text-[#111] active:translate-y-[1px]"
      >
        Restart Assessment
      </button>
    </div>
  );
}
