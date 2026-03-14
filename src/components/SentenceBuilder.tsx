import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SentencePractice } from '../types';
import { CheckCircle2, RotateCcw, HelpCircle, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface SentenceBuilderProps {
  practice: SentencePractice;
  onNext: () => void;
  currentIndex: number;
  total: number;
}

export const SentenceBuilder: React.FC<SentenceBuilderProps> = ({ practice, onNext, currentIndex, total }) => {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    setAvailableWords([...practice.shuffledWords]);
    setSelectedWords([]);
    setIsCorrect(false);
    setShowHint(false);
  }, [practice]);

  const handleWordClick = (word: string, fromSelected: boolean) => {
    if (isCorrect) return;

    if (fromSelected) {
      setSelectedWords(selectedWords.filter((w, i) => i !== selectedWords.indexOf(word)));
      setAvailableWords([...availableWords, word]);
    } else {
      setAvailableWords(availableWords.filter((w, i) => i !== availableWords.indexOf(word)));
      setSelectedWords([...selectedWords, word]);
    }
  };

  const checkSentence = () => {
    const currentSentence = selectedWords.join(' ');
    if (currentSentence === practice.correctSentence) {
      setIsCorrect(true);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const reset = () => {
    setAvailableWords([...practice.shuffledWords]);
    setSelectedWords([]);
    setIsCorrect(false);
    setShowHint(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col space-y-8">
      <div className="bg-white rounded-3xl shadow-xl border border-black/5 p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <Sparkles size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Sentence Practice</h2>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowHint(!showHint)}
              className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
              title="Hint"
            >
              <HelpCircle size={20} />
            </button>
            <button 
              onClick={reset}
              className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
              title="Reset"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showHint && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-6 bg-indigo-50 border border-indigo-100 rounded-2xl p-4 overflow-hidden"
            >
              <p className="text-sm text-indigo-700 italic">
                <strong>Hint:</strong> {practice.hint}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected Words Area */}
        <motion.div 
          animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
          className={cn(
            "relative min-h-[120px] p-6 rounded-2xl border-2 border-dashed transition-colors flex flex-wrap gap-3 items-center justify-center",
            isCorrect ? "bg-emerald-50 border-emerald-200" : "bg-slate-50 border-slate-200"
          )}
        >
          {selectedWords.length === 0 && !isCorrect && (
            <span className="text-slate-400 text-sm font-medium">Click words below to build the sentence</span>
          )}
          
          <AnimatePresence mode="popLayout">
            {selectedWords.map((word, index) => (
              <motion.button
                key={`${word}-${index}`}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isCorrect ? { scale: [1, 1.05, 1], opacity: 1 } : { scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => handleWordClick(word, true)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium shadow-sm border transition-all",
                  isCorrect ? "bg-emerald-500 text-white border-emerald-400" : "bg-white text-slate-700 border-slate-200 hover:border-indigo-300"
                )}
              >
                {word}
              </motion.button>
            ))}
          </AnimatePresence>

          {isCorrect && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-2 right-2 flex items-center gap-1.5 text-emerald-600 bg-emerald-50/80 px-2.5 py-1 rounded-lg border border-emerald-100 backdrop-blur-sm z-10"
            >
              <CheckCircle2 size={12} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Correct</span>
            </motion.div>
          )}
        </motion.div>

        {/* Available Words Area */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <AnimatePresence mode="popLayout">
            {!isCorrect && availableWords.map((word, index) => (
              <motion.button
                key={`${word}-${index}`}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={() => handleWordClick(word, false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium border border-slate-200 hover:bg-slate-200 hover:border-slate-300 transition-all shadow-sm"
              >
                {word}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          {!isCorrect ? (
            <button
              onClick={checkSentence}
              disabled={selectedWords.length === 0}
              className="px-8 py-3 rounded-2xl bg-indigo-600 text-white font-bold shadow-lg hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={onNext}
              className="px-8 py-3 rounded-2xl bg-emerald-600 text-white font-bold shadow-lg hover:bg-emerald-700 transition-all flex items-center gap-2"
            >
              Next Challenge <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-slate-400 text-sm font-medium">
        <span>Progress:</span>
        <div className="flex gap-1">
          {Array.from({ length: total }).map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "w-8 h-1.5 rounded-full transition-colors",
                i < currentIndex ? "bg-emerald-400" : i === currentIndex ? "bg-indigo-400" : "bg-slate-200"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
