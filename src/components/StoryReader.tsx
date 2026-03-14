import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Story } from '../types';
import { BookOpen, Info, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface StoryReaderProps {
  story: Story;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  total: number;
}

export const StoryReader: React.FC<StoryReaderProps> = ({ story, onNext, onPrev, currentIndex, total }) => {
  const [showGrammarInfo, setShowGrammarInfo] = useState(false);

  // Function to highlight bold text (which we use for grammar points in mock data)
  const renderContent = (content: string) => {
    const parts = content.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <motion.span
            key={index}
            initial={{ backgroundColor: 'rgba(52, 211, 153, 0)' }}
            whileHover={{ backgroundColor: 'rgba(52, 211, 153, 0.2)' }}
            className="font-bold text-emerald-700 px-1 rounded cursor-help transition-colors underline decoration-emerald-200 underline-offset-4"
            title={`Grammar focus: ${story.grammarFocus}`}
          >
            {part.slice(2, -2)}
          </motion.span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl border border-black/5 overflow-hidden"
      >
        <div className="p-8 border-b border-black/5 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-xl text-emerald-600">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{story.title}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border",
                  story.difficulty === 'Beginner' ? "text-blue-600 border-blue-200 bg-blue-50" :
                  story.difficulty === 'Intermediate' ? "text-amber-600 border-amber-200 bg-amber-50" :
                  "text-rose-600 border-rose-200 bg-rose-50"
                )}>
                  {story.difficulty}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Focus: {story.grammarFocus}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setShowGrammarInfo(!showGrammarInfo)}
            className="p-2 text-slate-400 hover:text-emerald-600 transition-colors"
            title="Grammar Info"
          >
            <Info size={20} />
          </button>
        </div>

        <AnimatePresence>
          {showGrammarInfo && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-emerald-50 border-b border-emerald-100 overflow-hidden"
            >
              <div className="p-6 flex items-start gap-4">
                <Sparkles size={20} className="text-emerald-500 mt-1 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-widest mb-1">
                    Grammar Focus: {story.grammarFocus}
                  </h3>
                  <p className="text-sm text-emerald-700 leading-relaxed">
                    In this story, we've highlighted key grammar points related to <strong>{story.grammarFocus}</strong>. 
                    Hover over the bold words to see them in context.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="p-10">
          <div className="prose prose-slate max-w-none">
            <p className="text-xl text-slate-900 leading-relaxed whitespace-pre-wrap font-serif">
              {renderContent(story.content)}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="flex items-center justify-between w-full px-4">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-md hover:bg-slate-50 transition-colors disabled:opacity-50 text-slate-600 font-medium"
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={20} /> Previous Story
        </button>
        
        <span className="text-sm font-medium text-slate-500">
          {currentIndex + 1} / {total}
        </span>

        <button
          onClick={onNext}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-md hover:bg-slate-50 transition-colors disabled:opacity-50 text-slate-600 font-medium"
          disabled={currentIndex === total - 1}
        >
          Next Story <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
