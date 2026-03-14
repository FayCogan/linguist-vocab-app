import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Vocabulary } from '../types';
import { cn } from '../lib/utils';
import { Volume2, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface FlashcardProps {
  vocab: Vocabulary;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  total: number;
}

export const Flashcard: React.FC<FlashcardProps> = ({ vocab, onNext, onPrev, currentIndex, total }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(vocab.word);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto space-y-8">
      <div className="relative w-full aspect-[3/2] perspective-1000 cursor-pointer" onClick={handleFlip}>
        <motion.div
          className="w-full h-full relative transition-all preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {/* Front Side */}
          <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-3xl shadow-xl border border-black/5 flex flex-col items-center justify-center p-6 text-center">
            <span className="text-sm font-medium text-emerald-600 mb-2 uppercase tracking-widest">{vocab.category}</span>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">{vocab.word}</h2>
            {vocab.pronunciation && (
              <div className="flex items-center gap-2 text-slate-500 mb-4">
                <button 
                  onClick={handleSpeak}
                  className="p-2 -m-2 rounded-full hover:bg-slate-100 text-emerald-600 transition-colors group"
                  title="Listen"
                >
                  <Volume2 size={18} className="group-hover:scale-110 transition-transform" />
                </button>
                <span className="font-mono text-xs">{vocab.pronunciation}</span>
              </div>
            )}
            <p className="text-slate-400 text-xs mt-auto italic">Click to flip</p>
          </div>

          {/* Back Side */}
          <div 
            className="absolute inset-0 w-full h-full backface-hidden bg-slate-900 rounded-3xl shadow-xl flex flex-col items-center justify-center p-6 text-center"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <h3 className="text-lg font-semibold text-white mb-2">Definition</h3>
            <p className="text-slate-300 text-base mb-4 leading-relaxed line-clamp-3">
              {vocab.definition}
            </p>
            <div className="w-full h-px bg-white/10 mb-4" />
            <h3 className="text-xs font-medium text-emerald-400 uppercase tracking-widest mb-1">Example</h3>
            <p className="text-slate-400 italic leading-relaxed text-sm line-clamp-2">
              "{vocab.example}"
            </p>
            <p className="text-slate-500 text-[10px] mt-auto italic">Click to flip back</p>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center justify-between w-full px-4">
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); setIsFlipped(false); }}
          className="p-3 rounded-full bg-white shadow-md hover:bg-slate-50 transition-colors disabled:opacity-50"
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={24} className="text-slate-600" />
        </button>
        
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium text-slate-500">
            {currentIndex + 1} / {total}
          </span>
          <button 
            onClick={() => setIsFlipped(false)}
            className="mt-2 text-xs text-emerald-600 font-medium hover:underline flex items-center gap-1"
          >
            <RotateCcw size={12} /> Reset Flip
          </button>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onNext(); setIsFlipped(false); }}
          className="p-3 rounded-full bg-white shadow-md hover:bg-slate-50 transition-colors disabled:opacity-50"
          disabled={currentIndex === total - 1}
        >
          <ChevronRight size={24} className="text-slate-600" />
        </button>
      </div>
    </div>
  );
};
