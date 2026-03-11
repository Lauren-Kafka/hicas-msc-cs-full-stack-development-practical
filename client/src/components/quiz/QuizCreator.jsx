import { useState } from 'react';

export function QuizCreator({ onComplete }) {
  const [title, setTitle] = useState('Custom Assessment');
  const [description, setDescription] = useState('Configure your technical proficiency quiz.');
  const [questions, setQuestions] = useState([
    {
      id: Date.now(),
      question: '',
      options: ['', '', '', ''],
      correctAnswerIndex: 0,
      explanation: ''
    }
  ]);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addOption = (qIndex) => {
    const updated = [...questions];
    if (updated[qIndex].options.length < 5) {
      updated[qIndex].options.push('');
      setQuestions(updated);
    }
  };

  const removeOption = (qIndex, oIndex) => {
    const updated = [...questions];
    if (updated[qIndex].options.length > 2) {
      updated[qIndex].options.splice(oIndex, 1);
      if (updated[qIndex].correctAnswerIndex >= updated[qIndex].options.length) {
         updated[qIndex].correctAnswerIndex = 0;
      }
      setQuestions(updated);
    }
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        question: '',
        options: ['', '', '', ''],
        correctAnswerIndex: 0,
        explanation: ''
      }
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      const updated = [...questions];
      updated.splice(index, 1);
      setQuestions(updated);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const q of questions) {
      if (!q.question.trim()) return alert('Please carefully fill out all question text.');
      for (const opt of q.options) {
        if (!opt.trim()) return alert('Please fill out all option text.');
      }
    }
    onComplete({ title, description, questions });
  };

  return (
    <div className="w-full max-w-3xl tech-panel rounded-xl flex flex-col relative bg-white mx-auto shadow-sm border border-[#eaeaea]">
      <div className="p-6 lg:p-8 border-b border-[#eaeaea] bg-[#fafafa] rounded-t-xl shrink-0">
        <h2 className="text-xl font-medium text-[#111] tracking-tight">Quiz Configurator</h2>
        <p className="text-sm text-[#666] mt-1">Define your questions and answers below.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-y-auto max-h-[70vh] p-6 lg:p-8 gap-8">
        
        {/* Core Info */}
        <div className="flex flex-col gap-4 pb-8 border-b border-[#eaeaea]">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono uppercase tracking-widest text-[#888]">Assessment Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="px-3 py-2 border border-[#eaeaea] rounded text-sm text-[#111] focus:outline-none focus:border-[#111] transition-colors bg-white shadow-sm"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono uppercase tracking-widest text-[#888]">Description</label>
            <input 
              type="text" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="px-3 py-2 border border-[#eaeaea] rounded text-sm text-[#111] focus:outline-none focus:border-[#111] transition-colors bg-white shadow-sm"
              required
            />
          </div>
        </div>

        {/* Questions list */}
        {questions.map((q, qIndex) => (
          <div key={q.id} className="flex flex-col gap-5 p-5 border border-[#eaeaea] rounded bg-[#fafafa] relative shadow-sm">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs uppercase tracking-widest text-[#111] bg-white px-2 py-1 border border-[#eaeaea] rounded shadow-sm">
                Question {String(qIndex + 1).padStart(2, '0')}
              </span>
              {questions.length > 1 && (
                <button type="button" onClick={() => removeQuestion(qIndex)} className="text-xs text-[#e00] hover:underline font-mono">
                  Remove
                </button>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono uppercase tracking-widest text-[#888]">Question Text</label>
              <textarea 
                value={q.question}
                onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                className="px-3 py-2 border border-[#eaeaea] rounded text-sm text-[#111] focus:outline-none focus:border-[#111] transition-colors bg-white min-h-[60px] shadow-sm resize-y"
                required
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-xs font-mono uppercase tracking-widest text-[#888]">Options (Max 5)</label>
              {q.options.map((opt, oIndex) => (
                <div key={oIndex} className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name={`correct-${q.id}`}
                    checked={q.correctAnswerIndex === oIndex}
                    onChange={() => handleQuestionChange(qIndex, 'correctAnswerIndex', oIndex)}
                    className="accent-[#111] w-4 h-4 cursor-pointer"
                    title="Mark as correct answer"
                  />
                  <input 
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                    className={`flex-1 px-3 py-2 border ${q.correctAnswerIndex === oIndex ? 'border-[#0070f3] bg-[#0070f3] bg-opacity-[0.02]' : 'border-[#eaeaea]'} rounded text-sm text-[#111] focus:outline-none focus:border-[#111] transition-colors bg-white shadow-sm`}
                    placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                    required
                  />
                  {q.options.length > 2 && (
                    <button type="button" onClick={() => removeOption(qIndex, oIndex)} className="text-[#999] hover:text-[#e00] text-lg leading-none cursor-pointer p-1">
                      &times;
                    </button>
                  )}
                </div>
              ))}
              {q.options.length < 5 && (
                <button type="button" onClick={() => addOption(qIndex)} className="self-start text-xs font-mono text-[#666] hover:text-[#111] px-2 py-1 border border-dashed border-[#ccc] rounded">
                  + Add Option
                </button>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono uppercase tracking-widest text-[#888]">Explanation (Optional)</label>
              <textarea 
                value={q.explanation}
                onChange={(e) => handleQuestionChange(qIndex, 'explanation', e.target.value)}
                className="px-3 py-2 border border-[#eaeaea] rounded text-sm text-[#111] focus:outline-none focus:border-[#111] transition-colors bg-white min-h-[50px] text-[#666] shadow-sm resize-y"
                placeholder="Why is this answer correct?"
              />
            </div>
          </div>
        ))}

        <button type="button" onClick={addQuestion} className="w-full py-3 border border-dashed border-[#ccc] rounded text-sm font-medium text-[#666] hover:text-[#111] hover:border-[#111] transition-colors bg-white shadow-sm">
          + Add Another Question
        </button>

      </form>

      <div className="p-6 lg:px-8 border-t border-[#eaeaea] bg-[#fafafa] flex justify-end shrink-0 rounded-b-xl">
        <button type="button" onClick={handleSubmit} className="rounded bg-[#111] border border-[#111] px-8 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-white hover:text-[#111]">
          Finish & Start Assessment
        </button>
      </div>

    </div>
  );
}
