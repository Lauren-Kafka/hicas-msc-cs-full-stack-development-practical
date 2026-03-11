import { useState } from 'react';
import { QuizStartScreen } from './QuizStartScreen';
import { QuizQuestion } from './QuizQuestion';
import { QuizResult } from './QuizResult';

export function Quiz({ data }) {
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [history, setHistory] = useState([]); // Array of booleans indicating correct/wrong
  
  const questionCount = data.questions.length;
  const currentQuestion = data.questions[currentQuestionIndex];

  // Handler: Start Quiz
  const handleStart = () => {
    setStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setHistory([]);
    setShowResult(false);
  };

  // Handler: Process Answer Selection
  const handleAnswer = (selectedIndex) => {
    const isCorrect = selectedIndex === currentQuestion.correctAnswerIndex;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setHistory([...history, isCorrect]);

    // Check if it's the last question
    if (currentQuestionIndex + 1 < questionCount) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  // Handler: Restart Quiz
  const handleRestart = () => {
    setStarted(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 sm:p-8 font-sans bg-[#fcfcfc]">
      {/* Container wrapper for neat UI centering */}
      <div className="w-full max-w-3xl tech-panel rounded-xl overflow-hidden min-h-[600px] flex flex-col relative">
        
        {/* State 1: Before Quiz Starts */}
        {!started && !showResult && (
          <QuizStartScreen 
            title={data.title} 
            description={data.description} 
            questionCount={questionCount} 
            onStart={handleStart} 
          />
        )}

        {/* State 2: Displaying Question */}
        {started && !showResult && (
          <QuizQuestion 
            questionData={currentQuestion}
            currentIndex={currentQuestionIndex}
            totalQuestions={questionCount}
            onAnswer={handleAnswer}
          />
        )}

        {/* State 3: Finished / Results */}
        {showResult && (
          <QuizResult 
            score={score}
            totalQuestions={questionCount}
            history={history}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}
