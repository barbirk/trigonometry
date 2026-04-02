import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Trophy, ArrowRight, RotateCcw, Lock } from 'lucide-react';
import { useProgressStore } from '../store/progressStore';

interface ModuleQuizProps {
  moduleId: number;
  onComplete?: (score: number) => void;
  isLocked?: boolean;
}

export default function ModuleQuiz({ moduleId, onComplete, isLocked }: ModuleQuizProps) {
  const { t, i18n } = useTranslation();
  const completeModule = useProgressStore(state => state.completeModule);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [problemsData, setProblemsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const lang = i18n.language as 'en' | 'fr';
  const QUIZ_SIZE = 10;

  // Load problems
  useEffect(() => {
    fetch('/trigonometry/data/problems.json')
      .then(res => res.json())
      .then(data => {
        const problems = Array.isArray(data) ? data : (data?.problems || []);
        setProblemsData(problems);
        setIsLoading(false);
      })
      .catch(() => {
        setProblemsData([]);
        setIsLoading(false);
      });
  }, [moduleId]);

  // Get problems for this module
  const moduleProblems = problemsData
    .filter((p: any) => p?.moduleId === moduleId)
    .slice(0, QUIZ_SIZE);

  const currentProblem = moduleProblems[currentQuestion];

  if (isLocked) {
    return (
      <div className="bg-surface-container border border-border-subtle rounded-2xl p-8 text-center">
        <Lock className="w-16 h-16 text-text-secondary mx-auto mb-4" />
        <h3 className="font-display font-bold text-xl text-white mb-2">
          {t('quiz.locked')}
        </h3>
        <p className="text-text-secondary">
          {t('quiz.completeTeachBack')}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-surface-container border border-border-subtle rounded-2xl p-8 text-center">
        <div className="animate-pulse">
          <div className="h-4 bg-surface rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-surface rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (moduleProblems.length === 0) {
    return (
      <div className="bg-surface-container border border-border-subtle rounded-2xl p-8 text-center">
        <p className="text-text-secondary">{t('quiz.noQuestions')}</p>
      </div>
    );
  }

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);

    const numAnswer = parseFloat(answer);
    const isCorrect = Math.abs(numAnswer - currentProblem.solution.answer) <= currentProblem.solution.tolerance;
    
    if (isCorrect) {
      setCorrectAnswers(c => c + 1);
    }
    setAnswers(prev => [...prev, isCorrect]);
  };

  const handleNext = () => {
    if (currentQuestion < moduleProblems.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
      const finalScore = Math.round(((correctAnswers + (selectedAnswer && Math.abs(parseFloat(selectedAnswer) - currentProblem.solution.answer) <= currentProblem.solution.tolerance ? 1 : 0)) / moduleProblems.length) * 100);
      completeModule(moduleId, finalScore, 2);
      if (onComplete) {
        onComplete(finalScore);
      }
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectAnswers(0);
    setIsFinished(false);
    setAnswers([]);
  };

  if (isFinished) {
    const finalCorrect = correctAnswers + (selectedAnswer && currentProblem && Math.abs(parseFloat(selectedAnswer) - currentProblem.solution.answer) <= currentProblem.solution.tolerance ? 1 : 0);
    const score = Math.round((finalCorrect / moduleProblems.length) * 100);
    const passed = score >= 70;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-surface-container border border-border-subtle rounded-2xl p-8"
      >
        <div className="text-center">
          <Trophy className={`w-20 h-20 mx-auto mb-4 ${passed ? 'text-primary' : 'text-hint'}`} />
          <h3 className="font-display font-bold text-3xl text-white mb-2">
            {passed ? t('quiz.congratulations') : t('quiz.keepTrying')}
          </h3>
          <p className="text-text-secondary mb-6">
            {t('quiz.scoreDisplay', { score })}
          </p>

          {/* Score Circle */}
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="56" fill="none" stroke="#1C1F2E" strokeWidth="12" />
              <circle
                cx="64" cy="64" r="56"
                fill="none"
                stroke={passed ? '#4DFFA4' : '#FFD166'}
                strokeWidth="12"
                strokeDasharray={`${(score / 100) * 351} 351`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-display font-bold text-white">{score}%</span>
            </div>
          </div>

          {/* Answer Summary */}
          <div className="flex justify-center gap-2 mb-6 flex-wrap max-w-md mx-auto">
            {answers.map((correct, idx) => (
              <div
                key={idx}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  correct ? 'bg-primary/20 text-primary' : 'bg-error/20 text-error'
                }`}
              >
                {correct ? '✓' : '✗'}
              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-center">
            {!passed && (
              <button
                onClick={handleRetry}
                className="flex items-center gap-2 px-6 py-3 bg-surface border border-border-subtle rounded-xl font-display font-bold text-white hover:border-primary transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                {t('quiz.retry')}
              </button>
            )}
            {passed && (
              <div className="px-6 py-3 bg-primary text-surface rounded-xl font-display font-bold">
                {t('quiz.moduleComplete')}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  const progress = ((currentQuestion + (showResult ? 1 : 0)) / moduleProblems.length) * 100;

  return (
    <div className="bg-surface-container border border-border-subtle rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-bold text-white">{t('quiz.title')}</h3>
        <span className="text-text-secondary text-sm">
          {currentQuestion + 1} / {moduleProblems.length}
        </span>
      </div>

      {/* Progress */}
      <div className="h-2 bg-surface rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div className="bg-surface p-6 rounded-xl border border-border-subtle">
            <p className="text-text-primary text-lg mb-4">{currentProblem.question[lang]}</p>
            
            {currentProblem.diagram?.hasDiagram && (
              <div className="mt-4 p-4 bg-surface-container rounded-lg">
                <MiniDiagram problem={currentProblem} />
              </div>
            )}
          </div>

          {/* Answer Input */}
          {!showResult ? (
            <div className="space-y-3">
              <label className="text-text-secondary text-sm">{t('quiz.yourAnswer')}</label>
              <div className="flex gap-3">
                <input
                  type="number"
                  step="0.01"
                  value={selectedAnswer || ''}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  placeholder={t('quiz.enterAnswer')}
                  className="flex-1 bg-surface border border-border-subtle rounded-xl px-4 py-3 text-white font-math focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  onKeyDown={(e) => e.key === 'Enter' && selectedAnswer && handleAnswer(selectedAnswer)}
                />
                <button
                  onClick={() => selectedAnswer && handleAnswer(selectedAnswer)}
                  disabled={!selectedAnswer}
                  className="px-6 bg-primary text-surface font-display font-bold rounded-xl disabled:opacity-50 hover:bg-primary-container transition-colors"
                >
                  {t('common.check')}
                </button>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border ${
                Math.abs(parseFloat(selectedAnswer || '0') - currentProblem.solution.answer) <= currentProblem.solution.tolerance
                  ? 'bg-primary/10 border-primary/30'
                  : 'bg-error/10 border-error/30'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                {Math.abs(parseFloat(selectedAnswer || '0') - currentProblem.solution.answer) <= currentProblem.solution.tolerance ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-display font-bold text-primary">{t('quiz.correct')}</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-error" />
                    <span className="font-display font-bold text-error">{t('quiz.incorrect')}</span>
                  </>
                )}
              </div>
              
              {Math.abs(parseFloat(selectedAnswer || '0') - currentProblem.solution.answer) > currentProblem.solution.tolerance && (
                <div className="mb-3">
                  <p className="text-text-secondary text-sm">{t('quiz.correctAnswer')}</p>
                  <p className="font-math text-primary text-lg">{currentProblem.solution.answer}</p>
                </div>
              )}

              <div>
                <p className="text-text-secondary text-sm mb-1">{t('quiz.solution')}</p>
                <p className="font-math text-text-primary">{currentProblem.solution.setup}</p>
              </div>

              <button
                onClick={handleNext}
                className="mt-4 w-full bg-primary text-surface font-display font-bold py-3 rounded-xl hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
              >
                {currentQuestion < moduleProblems.length - 1 ? t('common.next') : t('quiz.finish')}
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function MiniDiagram({ problem }: { problem: any }) {
  const d = problem.diagram;
  return (
    <svg viewBox="0 0 200 120" className="w-full max-w-xs mx-auto">
      <polygon points="30,100 170,100 30,20" fill="none" stroke="#4DFFA4" strokeWidth="2" />
      <rect x="30" y="85" width="15" height="15" fill="none" stroke="#4DFFA4" strokeWidth="1" />
      {d.angle && (
        <>
          <path d="M 50 100 A 20 20 0 0 0 42 85" fill="none" stroke="#FFD166" strokeWidth="2" />
          <text x="55" y="95" fill="#FFD166" fontSize="10" fontFamily="JetBrains Mono">{d.angle}°</text>
        </>
      )}
      {d.hypotenuse && (
        <text x="100" y="50" fill="#F0F4FF" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">{d.hypotenuse}</text>
      )}
      {d.opposite && (
        <text x="15" y="60" fill="#F0F4FF" fontSize="10" fontFamily="JetBrains Mono">{d.opposite}</text>
      )}
      {d.adjacent && (
        <text x="100" y="115" fill="#F0F4FF" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">{d.adjacent}</text>
      )}
    </svg>
  );
}
