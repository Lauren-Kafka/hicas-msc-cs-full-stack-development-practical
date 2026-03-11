import { useState } from 'react';
import { Quiz, QuizCreator } from './components/quiz';

function App() {
  const [quizData, setQuizData] = useState(null);

  const handleStartQuiz = (data) => {
    setQuizData(data);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col items-center justify-center p-4 sm:p-8 font-sans">
      {!quizData ? (
        <QuizCreator onComplete={handleStartQuiz} />
      ) : (
        <div className="w-full max-w-3xl flex flex-col items-center relative">
          <button 
            onClick={() => setQuizData(null)}
            className="absolute -top-10 left-0 text-xs text-[#888] hover:text-[#111] font-mono transition-colors uppercase tracking-widest z-10"
          >
            ← Back to Creator
          </button>
          <Quiz data={quizData} />
        </div>
      )}
    </div>
  );
}

export default App;
