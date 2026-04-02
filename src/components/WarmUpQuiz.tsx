import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, CheckCircle2, XCircle, ArrowRight, Trophy } from 'lucide-react';
import { useProgressStore } from '../store/progressStore';

interface WarmUpQuizProps {
  onComplete?: (result: { correct: number; total: number }) => void;
  onSkip?: () => void;
}

export default function WarmUpQuiz({ onComplete, onSkip }: WarmUpQuizProps) {
  const { t, i18n } = useTranslation();
  const { sm2Deck, updateCardReview } = useProgressStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizCards, setQuizCards] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [reviewCardsData, setReviewCardsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const lang = i18n.language as 'en' | 'fr';
  const QUIZ_SIZE = 3;

  // Load cards and setup quiz
  useEffect(() => {
    fetch('/trigonometry/data/reviewCards.json')
      .then(res => res.json())
      .then(data => {
        const cards = data?.reviewCards || data || [];
        setReviewCardsData(cards);
        setIsLoading(false);
      })
      .catch(() => {
        setReviewCardsData([]);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isLoading || reviewCardsData.length === 0) return;
    
    const today = new Date().toISOString().split('T')[0];
    
    const dueCards = Object.entries(sm2Deck)
      .filter(([_, card]: [string, any]) => !card.nextReviewDate || card.nextReviewDate <= today)
      .map(([id]) => id);

    let selected = dueCards.slice(0, QUIZ_SIZE);
    if (selected.length < QUIZ_SIZE) {
      const remaining = reviewCardsData
        .filter((c: any) => c?.id && !selected.includes(c.id))
        .map((c: any) => c.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, QUIZ_SIZE - selected.length);
      selected = [...selected, ...remaining];
    }
    
    setQuizCards(selected);
  }, [sm2Deck, reviewCardsData, isLoading]);

  const currentCardId = quizCards[currentIndex];
  const currentCard = reviewCardsData.find((c: any) => c?.id === currentCardId);

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);

    const isCorrect = answer === 'correct';
    if (isCorrect) {
      setCorrectCount(c => c + 1);
    }

    if (currentCardId) {
      updateCardReview(currentCardId, isCorrect ? 4 : 2);
    }
  };

  const handleNext = () => {
    if (currentIndex < quizCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
      const finalCorrect = correctCount + (selectedAnswer === 'correct' ? 1 : 0);
      if (onComplete) {
        onComplete({ correct: finalCorrect, total: QUIZ_SIZE });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="bg-surface-container border border-border-subtle rounded-2xl p-8 text-center">
        <BrainCircuit className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
        <p className="text-text-secondary">{t('warmUp.loading')}</p>
      </div>
    );
  }

  if (quizCards.length === 0 || reviewCardsData.length === 0) {
    return (
      <div className="bg-surface-container border border-border-subtle rounded-2xl p-8 text-center">
        <Trophy className="w-12 h-12 text-primary mx-auto mb-4" />
        <p className="text-text-secondary">{t('reviewDeck.allCaughtUp')}</p>
        {onSkip && (
          <button onClick={onSkip} className="mt-4 bg-primary text-surface px-6 py-2 rounded-lg">
            {t('common.continue')}
          </button>
        )}
      </div>
    );
  }

  if (isFinished) {
    const finalCorrect = correctCount + (selectedAnswer === 'correct' ? 1 : 0);
    const allCorrect = finalCorrect === QUIZ_SIZE;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-surface-container border border-border-subtle rounded-2xl p-8 text-center"
      >
        <Trophy className={`w-16 h-16 mx-auto mb-4 ${allCorrect ? 'text-primary' : 'text-hint'}`} />
        <h3 className="font-display font-bold text-2xl text-white mb-2">
          {allCorrect ? t('warmUp.perfect') : t('warmUp.goodJob')}
        </h3>
        <p className="text-text-secondary mb-6">
          {t('warmUp.score', { correct: finalCorrect, total: QUIZ_SIZE })}
        </p>
        <button
          onClick={() => onSkip?.()}
          className="bg-primary text-surface font-display font-bold px-8 py-3 rounded-xl hover:bg-primary-container transition-colors"
        >
          {t('warmUp.continue')}
        </button>
      </motion.div>
    );
  }

  if (!currentCard) return null;

  const progress = ((currentIndex + (showResult ? 1 : 0)) / QUIZ_SIZE) * 100;

  return (
    <div className="bg-surface-container border border-border-subtle rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BrainCircuit className="w-6 h-6 text-primary" />
          <h3 className="font-display font-bold text-white">{t('warmUp.title')}</h3>
        </div>
        <span className="text-text-secondary text-sm">
          {currentIndex + 1} / {QUIZ_SIZE}
        </span>
      </div>

      {/* Progress Bar */}
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
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div className="bg-surface p-6 rounded-xl border border-border-subtle min-h-[120px] flex items-center">
            <p className="text-text-primary text-lg">{currentCard.front?.[lang] || currentCard.front?.en}</p>
          </div>

          {/* Answer Options */}
          {!showResult ? (
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => handleAnswer('correct')}
                className="p-4 bg-surface border border-border-subtle rounded-xl text-left hover:border-primary transition-colors flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">✓</div>
                <span>{t('warmUp.iKnowThis')}</span>
              </button>
              <button
                onClick={() => handleAnswer('wrong')}
                className="p-4 bg-surface border border-border-subtle rounded-xl text-left hover:border-hint transition-colors flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-hint/20 flex items-center justify-center text-hint font-bold">?</div>
                <span>{t('warmUp.needPractice')}</span>
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border ${
                selectedAnswer === 'correct'
                  ? 'bg-primary/10 border-primary/30'
                  : 'bg-hint/10 border-hint/30'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {selectedAnswer === 'correct' ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-display font-bold text-primary">{t('warmUp.correct')}</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-hint" />
                    <span className="font-display font-bold text-hint">{t('warmUp.review')}</span>
                  </>
                )}
              </div>
              <p className="text-text-primary">{currentCard.back?.[lang] || currentCard.back?.en}</p>
              <button
                onClick={handleNext}
                className="mt-4 w-full bg-primary text-surface font-display font-bold py-3 rounded-xl hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
              >
                {currentIndex < quizCards.length - 1 ? t('common.next') : t('warmUp.finish')}
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {!showResult && (
        <button onClick={onSkip} className="mt-4 text-text-secondary text-sm hover:text-primary transition-colors">
          {t('warmUp.skip')}
        </button>
      )}
    </div>
  );
}
