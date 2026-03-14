import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Vocabulary, SentencePractice, TestQuestion, TestDifficulty } from '../types';
import { 
  Trophy, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Brain, 
  Zap, 
  Target,
  RefreshCcw,
  ChevronLeft
} from 'lucide-react';
import { cn } from '../lib/utils';

interface TestModeProps {
  vocab: Vocabulary[];
  sentences: SentencePractice[];
  selectedUnits: number[];
  onComplete?: (difficulty: TestDifficulty, score: number) => void;
  highScores?: { Easy: number; Medium: number; Advanced: number };
}

export const TestMode: React.FC<TestModeProps> = ({ vocab, sentences, selectedUnits, onComplete, highScores }) => {
  const [difficulty, setDifficulty] = useState<TestDifficulty | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shuffledRearrange, setShuffledRearrange] = useState<string[]>([]);
  const [selectedRearrange, setSelectedRearrange] = useState<string[]>([]);
  const [questionStatuses, setQuestionStatuses] = useState<('not-done' | 'skipped' | 'correct' | 'incorrect')[]>([]);
  const [answers, setAnswers] = useState<(string | null)[]>([]);

  useEffect(() => {
    if (showResult && difficulty && onComplete) {
      onComplete(difficulty, score);
    }
  }, [showResult, difficulty, score, onComplete]);

  // Generate questions based on difficulty and unit
  const questions = useMemo(() => {
    const unitVocab = vocab.filter(v => selectedUnits.includes(v.unit));
    const unitSentences = sentences.filter(s => selectedUnits.includes(s.unit));
    const generated: TestQuestion[] = [];

    if (difficulty === 'Easy') {
      // MCQ: Definition -> Word
      unitVocab.forEach(v => {
        const distractors = vocab
          .filter(other => other.id !== v.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map(other => other.word);
        
        generated.push({
          id: `easy-mcq-${v.id}`,
          type: 'mcq',
          question: `What word matches this definition: "${v.definition}"?`,
          options: [v.word, ...distractors].sort(() => 0.5 - Math.random()),
          correctAnswer: v.word,
          unit: v.unit,
          difficulty: 'Easy'
        });
      });

      // Simple Rearrange
      unitSentences.forEach(s => {
        generated.push({
          id: `easy-rearrange-${s.id}`,
          type: 'rearrange',
          question: 'Rearrange the words to form a correct sentence:',
          correctAnswer: s.correctSentence,
          hint: s.hint,
          unit: s.unit,
          difficulty: 'Easy'
        });
      });
    } else if (difficulty === 'Medium') {
      // Context-based: Example with blank
      unitVocab.forEach(v => {
        const blankedExample = v.example.replace(new RegExp(v.word, 'gi'), '__________');
        const distractors = vocab
          .filter(other => other.id !== v.id && other.category === v.category)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map(other => other.word);

        generated.push({
          id: `medium-context-${v.id}`,
          type: 'mcq',
          question: `Complete the sentence: "${blankedExample}"`,
          options: [v.word, ...distractors].sort(() => 0.5 - Math.random()),
          correctAnswer: v.word,
          unit: v.unit,
          difficulty: 'Medium'
        });
      });
    } else if (difficulty === 'Advanced') {
      // Active Recall: Definition -> Type Word
      unitVocab.forEach(v => {
        generated.push({
          id: `advanced-typing-${v.id}`,
          type: 'typing',
          question: `Type the word that means: "${v.definition}"`,
          correctAnswer: v.word,
          hint: `Starts with: ${v.word[0]}`,
          unit: v.unit,
          difficulty: 'Advanced'
        });
      });
    }

    const shuffled = generated.sort(() => 0.5 - Math.random());
    setQuestionStatuses(new Array(shuffled.length).fill('not-done'));
    setAnswers(new Array(shuffled.length).fill(null));
    return shuffled;
  }, [difficulty, vocab, sentences, selectedUnits]);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (currentQuestion?.type === 'rearrange') {
      const sentence = sentences.find(s => s.correctSentence === currentQuestion.correctAnswer);
      if (sentence) {
        setShuffledRearrange([...sentence.shuffledWords]);
        setSelectedRearrange([]);
      }
    }
  }, [currentQuestionIndex, currentQuestion, sentences]);

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    
    setUserAnswer(answer);
    setIsAnswered(true);
    const correct = answer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim();
    setIsCorrect(correct);
    
    const newStatuses = [...questionStatuses];
    newStatuses[currentQuestionIndex] = correct ? 'correct' : 'incorrect';
    setQuestionStatuses(newStatuses);

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);

    if (correct) setScore(prev => prev + 1);
  };

  const skipQuestion = () => {
    const newStatuses = [...questionStatuses];
    if (newStatuses[currentQuestionIndex] === 'not-done') {
      newStatuses[currentQuestionIndex] = 'skipped';
    }
    setQuestionStatuses(newStatuses);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsAnswered(false);
      setIsCorrect(null);
      setUserAnswer('');
    } else {
      setShowResult(true);
    }
  };

  const handleRearrangeClick = (word: string, fromSelected: boolean) => {
    if (isAnswered) return;
    if (fromSelected) {
      setSelectedRearrange(prev => prev.filter((w, i) => i !== prev.indexOf(word)));
      setShuffledRearrange(prev => [...prev, word]);
    } else {
      setShuffledRearrange(prev => prev.filter((w, i) => i !== prev.indexOf(word)));
      setSelectedRearrange(prev => [...prev, word]);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsAnswered(false);
      setIsCorrect(null);
      setUserAnswer('');
    } else {
      setShowResult(true);
    }
  };

  const resetTest = () => {
    setDifficulty(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setIsAnswered(false);
    setIsCorrect(null);
    setUserAnswer('');
    setQuestionStatuses([]);
    setAnswers([]);
  };

  if (!difficulty) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 mb-4">Choose Your Challenge</h2>
          <p className="text-slate-500">Select a difficulty level to start the test for Units {selectedUnits.join(', ')}.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DifficultyCard 
            level="Easy"
            description="MCQs and simple sentence building."
            icon={<Zap className="text-emerald-500" />}
            color="emerald"
            highScore={highScores?.Easy}
            onClick={() => setDifficulty('Easy')}
          />
          <DifficultyCard 
            level="Medium"
            description="Context-based vocabulary application."
            icon={<Target className="text-blue-500" />}
            color="blue"
            highScore={highScores?.Medium}
            onClick={() => setDifficulty('Medium')}
          />
          <DifficultyCard 
            level="Advanced"
            description="Active recall and typing mastery."
            icon={<Brain className="text-indigo-500" />}
            color="indigo"
            highScore={highScores?.Advanced}
            onClick={() => setDifficulty('Advanced')}
          />
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-10 shadow-2xl border border-black/5 text-center"
        >
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy size={48} className="text-emerald-600" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">Test Complete!</h2>
          <p className="text-slate-500 mb-8">You've mastered Units {selectedUnits.join(', ')} at {difficulty} level.</p>
          
          <div className="bg-slate-50 rounded-2xl p-6 mb-8 max-w-sm mx-auto">
            <div className="text-5xl font-black text-slate-900 mb-1">{percentage}%</div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Your Score</div>
            <div className="mt-4 text-slate-600 font-medium">
              {score} out of {questions.length} correct
            </div>
          </div>

          <button 
            onClick={resetTest}
            className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all mx-auto"
          >
            <RefreshCcw size={20} /> Try Another Level
          </button>
        </motion.div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-black/5">
          <h3 className="text-xl font-black text-slate-900 mb-6">Review Your Work</h3>
          <div className="space-y-6">
            {questions.map((q, idx) => (
              <div key={q.id} className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-black text-slate-600">
                      {idx + 1}
                    </span>
                    <p className="font-bold text-slate-800">{q.question}</p>
                  </div>
                  {questionStatuses[idx] === 'correct' ? (
                    <CheckCircle2 className="text-emerald-500 shrink-0" size={24} />
                  ) : questionStatuses[idx] === 'skipped' ? (
                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Skipped</div>
                  ) : (
                    <XCircle className="text-rose-500 shrink-0" size={24} />
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 rounded-xl bg-white border border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Your Answer</span>
                    <span className={cn(
                      "font-bold",
                      questionStatuses[idx] === 'correct' ? "text-emerald-600" : "text-rose-600"
                    )}>
                      {answers[idx] || 'No answer'}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Correct Answer</span>
                    <span className="font-bold text-slate-800">{q.correctAnswer}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500 mb-4">No questions available for this unit and difficulty.</p>
        <button onClick={() => setDifficulty(null)} className="text-emerald-600 font-bold">Go Back</button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => setDifficulty(null)}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold transition-colors"
          >
            <ChevronLeft size={20} /> Quit Test
          </button>
          <div className="px-4 py-1.5 bg-slate-100 rounded-full text-xs font-black text-slate-500 uppercase tracking-widest">
            Question {currentQuestionIndex + 1} / {questions.length}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-black/5">
          <h3 className="text-xl font-bold text-slate-900 mb-8 leading-relaxed">
            {currentQuestion.question}
          </h3>

          {currentQuestion.type === 'mcq' && (
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options?.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(option)}
                  disabled={isAnswered}
                  className={cn(
                    "w-full p-4 rounded-2xl text-left font-medium border-2 transition-all",
                    !isAnswered && "bg-white border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30",
                    isAnswered && option === currentQuestion.correctAnswer && "bg-emerald-50 border-emerald-500 text-emerald-700",
                    isAnswered && userAnswer === option && option !== currentQuestion.correctAnswer && "bg-rose-50 border-rose-500 text-rose-700",
                    isAnswered && option !== currentQuestion.correctAnswer && "opacity-50"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {isAnswered && option === currentQuestion.correctAnswer && <CheckCircle2 size={20} />}
                    {isAnswered && userAnswer === option && option !== currentQuestion.correctAnswer && <XCircle size={20} />}
                  </div>
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'rearrange' && (
            <div className="space-y-6">
              <div className="min-h-[100px] p-6 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-wrap gap-2 items-center justify-center">
                {selectedRearrange.map((word, i) => (
                  <button
                    key={i}
                    onClick={() => handleRearrangeClick(word, true)}
                    disabled={isAnswered}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium shadow-sm"
                  >
                    {word}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {shuffledRearrange.map((word, i) => (
                  <button
                    key={i}
                    onClick={() => handleRearrangeClick(word, false)}
                    disabled={isAnswered}
                    className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors"
                  >
                    {word}
                  </button>
                ))}
              </div>
              {!isAnswered && (
                <button 
                  onClick={() => handleAnswer(selectedRearrange.join(' '))}
                  className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg hover:bg-indigo-700 transition-all"
                >
                  Check Sentence
                </button>
              )}
            </div>
          )}

          {currentQuestion.type === 'typing' && (
            <div className="space-y-4">
              <input 
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={isAnswered}
                placeholder="Type your answer here..."
                className={cn(
                  "w-full p-4 rounded-2xl border-2 text-lg font-bold transition-all outline-none",
                  !isAnswered && "border-slate-100 focus:border-indigo-500 bg-slate-50",
                  isAnswered && isCorrect && "border-emerald-500 bg-emerald-50 text-emerald-700",
                  isAnswered && !isCorrect && "border-rose-500 bg-rose-50 text-rose-700"
                )}
                onKeyDown={(e) => e.key === 'Enter' && handleAnswer(userAnswer)}
              />
              {!isAnswered && (
                <button 
                  onClick={() => handleAnswer(userAnswer)}
                  className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg hover:bg-indigo-700 transition-all"
                >
                  Submit Answer
                </button>
              )}
              {isAnswered && !isCorrect && (
                <p className="text-sm font-bold text-rose-600">
                  Correct answer: <span className="underline">{currentQuestion.correctAnswer}</span>
                </p>
              )}
            </div>
          )}

          <AnimatePresence>
            {isAnswered && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {isCorrect ? (
                    <div className="flex items-center gap-2 text-emerald-600 font-bold">
                      <CheckCircle2 size={24} /> Excellent!
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-rose-600 font-bold">
                      <XCircle size={24} /> Keep trying!
                    </div>
                  )}
                </div>
                <button 
                  onClick={nextQuestion}
                  className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all"
                >
                  {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'} <ArrowRight size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {!isAnswered && (
            <div className="mt-8 pt-8 border-t border-slate-100 flex justify-end">
              <button 
                onClick={skipQuestion}
                className="px-6 py-3 text-slate-400 hover:text-slate-600 font-bold transition-colors"
              >
                Skip Question
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-black/5">
          <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Question Navigator</h4>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (idx <= currentQuestionIndex || questionStatuses[idx] !== 'not-done') {
                    setCurrentQuestionIndex(idx);
                    setIsAnswered(questionStatuses[idx] !== 'not-done' && questionStatuses[idx] !== 'skipped');
                    setIsCorrect(questionStatuses[idx] === 'correct');
                    setUserAnswer(answers[idx] || '');
                  }
                }}
                className={cn(
                  "aspect-square rounded-lg border-2 transition-all flex items-center justify-center text-xs font-black",
                  idx === currentQuestionIndex ? "bg-blue-500 border-blue-600 text-white shadow-lg shadow-blue-200" :
                  questionStatuses[idx] === 'skipped' ? "bg-slate-600 border-slate-700 text-white" :
                  questionStatuses[idx] !== 'not-done' ? "bg-slate-100 border-slate-200 text-slate-400" :
                  "bg-white border-slate-100 text-slate-300"
                )}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
              <div className="w-3 h-3 rounded bg-white border border-slate-200" /> Not Done
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
              <div className="w-3 h-3 rounded bg-blue-500" /> Current
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
              <div className="w-3 h-3 rounded bg-slate-600" /> Skipped
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
              <div className="w-3 h-3 rounded bg-slate-100 border border-slate-200" /> Answered
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function DifficultyCard({ level, description, icon, color, onClick, highScore }: {
  level: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
  highScore?: number;
}) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="bg-white rounded-3xl p-8 shadow-xl border border-black/5 cursor-pointer group flex flex-col h-full relative overflow-hidden"
    >
      {highScore !== undefined && highScore > 0 && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
          <Trophy size={10} /> Best: {highScore}
        </div>
      )}
      <div className="p-4 rounded-2xl bg-slate-50 w-fit mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-black text-slate-900 mb-2">{level}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
        {description}
      </p>
      <div className="flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:gap-3 transition-all">
        Start Test <ArrowRight size={16} />
      </div>
    </motion.div>
  );
}
