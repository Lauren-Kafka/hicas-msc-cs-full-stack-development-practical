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
    setShowResult(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setHistory([]);
  };

  return (
    <div className="w-full max-w-3xl tech-panel rounded-xl overflow-hidden flex flex-col relative bg-white shadow-[0_4px_14px_0_rgba(0,0,0,0.05)] border border-[#eaeaea]" style={{ height: '650px', maxHeight: '85vh' }}>
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
  );
}
