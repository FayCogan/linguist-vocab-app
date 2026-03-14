import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Layers, 
  Puzzle, 
  GraduationCap, 
  Settings, 
  TrendingUp,
  Menu,
  X,
  ChevronRight,
  Trophy,
  Zap
} from 'lucide-react';
import { Flashcard } from './components/Flashcard';
import { StoryReader } from './components/StoryReader';
import { SentenceBuilder } from './components/SentenceBuilder';
import { TestMode } from './components/TestMode';
import { Timer } from './components/Timer';
import { mockVocab, mockStories, mockSentences } from './data';
import { cn } from './lib/utils';

type Mode = 'flashcards' | 'stories' | 'practice' | 'dashboard' | 'test';

interface HighScores {
  Easy: number;
  Medium: number;
  Advanced: number;
}

export default function App() {
  const [mode, setMode] = useState<Mode>('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // State for each mode
  const [vocabIndex, setVocabIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  
  // Persistence initialization
  const [selectedUnit, setSelectedUnit] = useState<number>(() => {
    const saved = localStorage.getItem('linguist_last_unit');
    return saved ? parseInt(saved, 10) : 1;
  });
  
  const [highScores, setHighScores] = useState<HighScores>(() => {
    const saved = localStorage.getItem('linguist_high_scores');
    return saved ? JSON.parse(saved) : { Easy: 0, Medium: 0, Advanced: 0 };
  });

  const [testUnits, setTestUnits] = useState<number[]>([selectedUnit]);
  const [sessionTime, setSessionTime] = useState<number | null>(null);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // Persistence effects
  React.useEffect(() => {
    localStorage.setItem('linguist_last_unit', selectedUnit.toString());
  }, [selectedUnit]);

  React.useEffect(() => {
    localStorage.setItem('linguist_high_scores', JSON.stringify(highScores));
  }, [highScores]);

  const filteredVocab = mockVocab.filter(v => v.unit === selectedUnit);
  const filteredStories = mockStories.filter(s => s.unit === selectedUnit);
  const filteredPractice = mockSentences.filter(p => p.unit === selectedUnit);

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setVocabIndex(0);
    setStoryIndex(0);
    setSentenceIndex(0);
    setIsTimeUp(false);
    if (newMode === 'dashboard') {
      setSessionTime(null);
    }
  };

  const renderContent = () => {
    if (isTimeUp) {
      return (
        <div className="max-w-md mx-auto bg-white rounded-3xl p-10 shadow-2xl border border-black/5 text-center">
          <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap size={40} className="text-rose-600" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">Time's Up!</h2>
          <p className="text-slate-500 mb-8">Your study session has ended. Great job staying focused!</p>
          <button 
            onClick={() => handleModeChange('dashboard')}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      );
    }

    if (mode !== 'dashboard' && sessionTime === null) {
      return (
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Set Your Timer</h2>
            <p className="text-slate-500">How long would you like to practice {mode}?</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[5, 10, 15, 30].map((mins) => (
              <button
                key={mins}
                onClick={() => setSessionTime(mins)}
                className="p-6 bg-white rounded-2xl border-2 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all group"
              >
                <div className="text-2xl font-black text-slate-900 group-hover:text-emerald-600">{mins}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Minutes</div>
              </button>
            ))}
          </div>
          <button 
            onClick={() => setSessionTime(0)} // 0 means no timer
            className="w-full mt-6 py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors"
          >
            Continue without timer
          </button>
        </div>
      );
    }

    switch (mode) {
      case 'flashcards':
        return (
          <div className="flex flex-col gap-8">
            <UnitTaskbar 
              selectedUnit={selectedUnit} 
              onSelect={(u) => { setSelectedUnit(u); setVocabIndex(0); }} 
            />
            {filteredVocab.length > 0 ? (
              <Flashcard 
                vocab={filteredVocab[vocabIndex]} 
                onNext={() => setVocabIndex((prev) => Math.min(prev + 1, filteredVocab.length - 1))}
                onPrev={() => setVocabIndex((prev) => Math.max(prev - 1, 0))}
                currentIndex={vocabIndex}
                total={filteredVocab.length}
              />
            ) : (
              <EmptyState unit={selectedUnit} mode="vocabulary" />
            )}
          </div>
        );
      case 'stories':
        return (
          <div className="flex flex-col gap-8">
            <UnitTaskbar 
              selectedUnit={selectedUnit} 
              onSelect={(u) => { setSelectedUnit(u); setStoryIndex(0); }} 
            />
            {filteredStories.length > 0 ? (
              <StoryReader 
                story={filteredStories[storyIndex]}
                onNext={() => setStoryIndex((prev) => Math.min(prev + 1, filteredStories.length - 1))}
                onPrev={() => setStoryIndex((prev) => Math.max(prev - 1, 0))}
                currentIndex={storyIndex}
                total={filteredStories.length}
              />
            ) : (
              <EmptyState unit={selectedUnit} mode="stories" />
            )}
          </div>
        );
      case 'practice':
        return (
          <div className="flex flex-col gap-8">
            <UnitTaskbar 
              selectedUnit={selectedUnit} 
              onSelect={(u) => { setSelectedUnit(u); setSentenceIndex(0); }} 
            />
            {filteredPractice.length > 0 ? (
              <SentenceBuilder 
                practice={filteredPractice[sentenceIndex]}
                onNext={() => setSentenceIndex((prev) => (prev + 1) % filteredPractice.length)}
                currentIndex={sentenceIndex}
                total={filteredPractice.length}
              />
            ) : (
              <EmptyState unit={selectedUnit} mode="practice" />
            )}
          </div>
        );
      case 'test':
        return (
          <div className="flex flex-col gap-8">
            <UnitSelector 
              selectedUnits={testUnits} 
              onToggle={(unit) => {
                setTestUnits(prev => 
                  prev.includes(unit) 
                    ? (prev.length > 1 ? prev.filter(u => u !== unit) : prev) 
                    : [...prev, unit].sort((a, b) => a - b)
                );
              }} 
            />
            <TestMode 
              vocab={mockVocab} 
              sentences={mockSentences} 
              selectedUnits={testUnits}
              highScores={highScores}
              onComplete={(diff, score) => {
                setHighScores(prev => ({
                  ...prev,
                  [diff]: Math.max(prev[diff], score)
                }));
              }}
            />
          </div>
        );
      case 'dashboard':
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <DashboardCard 
              title="Flashcards" 
              description="Master new vocabulary with interactive cards."
              icon={<Layers className="text-emerald-500" />}
              color="emerald"
              onClick={() => setMode('flashcards')}
              stats="4 New Words"
            />
            <DashboardCard 
              title="Grammar Stories" 
              description="Learn grammar in context through engaging tales."
              icon={<BookOpen className="text-blue-500" />}
              color="blue"
              onClick={() => setMode('stories')}
              stats="2 Stories Available"
            />
            <DashboardCard 
              title="Word Practice" 
              description="Build sentences and perfect your syntax."
              icon={<Puzzle className="text-indigo-500" />}
              color="indigo"
              onClick={() => setMode('practice')}
              stats="3 Challenges"
            />
            <DashboardCard 
              title="Knowledge Test" 
              description="Challenge yourself with unit-based exams."
              icon={<Trophy className="text-rose-500" />}
              color="rose"
              onClick={() => setMode('test')}
              stats={
                highScores.Advanced > 0 || highScores.Medium > 0 || highScores.Easy > 0
                  ? `Best: ${Math.max(highScores.Easy, highScores.Medium, highScores.Advanced)}`
                  : '3 Levels'
              }
            />
            
            <div className="md:col-span-2 lg:col-span-3 mt-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-black/5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <TrendingUp className="text-rose-500" /> Your Progress
                  </h3>
                  <span className="text-sm font-medium text-slate-400">Last 7 Days</span>
                </div>
                <div className="grid grid-cols-7 gap-4 items-end h-32">
                  {[40, 65, 30, 85, 50, 75, 90].map((height, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        className="w-full bg-slate-100 rounded-t-lg relative group"
                      >
                        <div className="absolute inset-0 bg-rose-400 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setMode('dashboard')}
          >
            <div className="p-2 bg-emerald-600 rounded-xl text-white shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform">
              <GraduationCap size={24} />
            </div>
            <h1 className="text-xl font-black tracking-tight text-slate-900">LINGUIST</h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <NavButton active={mode === 'dashboard'} onClick={() => handleModeChange('dashboard')}>Dashboard</NavButton>
            <NavButton active={mode === 'flashcards'} onClick={() => handleModeChange('flashcards')}>Flashcards</NavButton>
            <NavButton active={mode === 'stories'} onClick={() => handleModeChange('stories')}>Stories</NavButton>
            <NavButton active={mode === 'practice'} onClick={() => handleModeChange('practice')}>Practice</NavButton>
            <NavButton active={mode === 'test'} onClick={() => handleModeChange('test')}>Test</NavButton>
          </div>

          <div className="flex items-center gap-2">
            {mode !== 'dashboard' && sessionTime !== null && sessionTime > 0 && (
              <Timer 
                initialMinutes={sessionTime} 
                isActive={!isTimeUp} 
                onTimeUp={() => setIsTimeUp(true)} 
              />
            )}
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Settings size={20} />
            </button>
            <button 
              className="md:hidden p-2 text-slate-400 hover:text-slate-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {['dashboard', 'flashcards', 'stories', 'practice', 'test'].map((m) => (
                <button
                  key={m}
                  onClick={() => { handleModeChange(m as Mode); setIsMenuOpen(false); }}
                  className={cn(
                    "text-2xl font-bold py-4 border-b border-slate-100 text-left capitalize",
                    mode === m ? "text-emerald-600" : "text-slate-400"
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-12 text-center">
          <motion.h2 
            key={mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black text-slate-900 mb-4 capitalize"
          >
            {mode === 'dashboard' ? 'Welcome back, Learner!' : mode}
          </motion.h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            {mode === 'dashboard' && "Ready to continue your language journey? Pick a mode and start learning."}
            {mode === 'flashcards' && "Flip cards to learn new words and their definitions."}
            {mode === 'stories' && "Read carefully and notice how grammar is used in real sentences."}
            {mode === 'practice' && "Drag and drop words to form correct sentences."}
            {mode === 'test' && "Put your knowledge to the test with dynamic questions."}
          </p>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-12 border-t border-black/5 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-100 rounded-lg text-slate-400">
              <GraduationCap size={16} />
            </div>
            <span className="text-sm font-bold text-slate-400 tracking-tight">LINGUIST © 2024</span>
          </div>
          <div className="flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavButton({ children, active, onClick }: { children: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-xl text-sm font-bold transition-all",
        active 
          ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
      )}
    >
      {children}
    </button>
  );
}

function DashboardCard({ title, description, icon, color, onClick, stats }: { 
  title: string, 
  description: string, 
  icon: React.ReactNode, 
  color: string,
  onClick: () => void,
  stats: string
}) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="bg-white rounded-3xl p-8 shadow-xl border border-black/5 cursor-pointer group flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="p-4 rounded-2xl bg-slate-50 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
          {stats}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed mb-8 flex-grow">
        {description}
      </p>
      <div className="flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:gap-3 transition-all">
        Start Learning <ChevronRight size={16} />
      </div>
    </motion.div>
  );
}

function UnitTaskbar({ selectedUnit, onSelect }: { selectedUnit: number, onSelect: (unit: number) => void }) {
  return (
    <div className="flex items-center justify-center gap-2 overflow-x-auto py-4 px-2 scrollbar-hide">
      {Array.from({ length: 8 }).map((_, i) => (
        <button
          key={i + 1}
          onClick={() => onSelect(i + 1)}
          className={cn(
            "flex-shrink-0 px-6 py-3 rounded-2xl font-bold transition-all border-2",
            selectedUnit === i + 1
              ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-200 scale-105"
              : "bg-white text-slate-500 border-slate-100 hover:border-emerald-200 hover:text-emerald-600"
          )}
        >
          Unit {i + 1}
        </button>
      ))}
    </div>
  );
}

function UnitSelector({ selectedUnits, onToggle }: { selectedUnits: number[], onToggle: (unit: number) => void }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-black/5">
      <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 text-center">Select Units for Test</h4>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {Array.from({ length: 8 }).map((_, i) => {
          const unit = i + 1;
          const isSelected = selectedUnits.includes(unit);
          return (
            <button
              key={unit}
              onClick={() => onToggle(unit)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all border-2",
                isSelected
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                  : "bg-white text-slate-400 border-slate-100 hover:border-indigo-200 hover:text-indigo-600"
              )}
            >
              <div className={cn(
                "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                isSelected ? "bg-white border-white" : "bg-slate-50 border-slate-200"
              )}>
                {isSelected && <div className="w-2 h-2 bg-indigo-600 rounded-sm" />}
              </div>
              Unit {unit}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function EmptyState({ unit, mode }: { unit: number, mode: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
      <div className="p-4 bg-slate-50 rounded-full text-slate-300 mb-4">
        <BookOpen size={48} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">No {mode} for Unit {unit}</h3>
      <p className="text-slate-500 max-w-xs">We're still adding content for this unit. Please check back soon!</p>
    </div>
  );
}
