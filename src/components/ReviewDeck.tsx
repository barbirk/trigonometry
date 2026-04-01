import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw, Clock, Trophy } from 'lucide-react';
import { useProgressStore } from '../store/progressStore';
// Import review cards - handle both direct array and wrapped object formats
import reviewCardsJson from '../data/reviewCards.json';
const importedData = reviewCardsJson as any;
const reviewCardsData: any[] = Array.isArray(importedData?.reviewCards) 
  ? importedData.reviewCards 
  : Array.isArray(importedData) 
    ? importedData 
    : [];

interface ReviewDeckProps {
  onClose?: () => void;
}

export default function ReviewDeck({ onClose }: ReviewDeckProps) {
  const { t, i18n } = useTranslation();
  const { sm2Deck, updateCardReview } = useProgressStore();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionCards, setSessionCards] = useState<string[]>([]);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [startTime] = useState(Date.now());
  const [stats, setStats] = useState({ easy: 0, medium: 0, hard: 0 });

  const lang = i18n.language as 'en' | 'fr';

  // Get due cards on mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const dueCardIds = Object.entries(sm2Deck)
      .filter(([_, card]) => !card.nextReviewDate || card.nextReviewDate <= today)
      .map(([id, _]) => id)
      .slice(0, 10); // Max 10 cards per session

    // If no due cards, show some new cards
    if (dueCardIds.length === 0) {
      const newCards = reviewCardsData
        .filter((card: any) => card?.id && !sm2Deck[card.id])
        .slice(0, 5)
        .map((card: any) => card.id);
      setSessionCards(newCards);
    } else {
      setSessionCards(dueCardIds);
    }
  }, [sm2Deck]);

  const currentCardId = sessionCards[currentCardIndex];
  const currentCard = reviewCardsData.find((c: any) => c?.id === currentCardId);

  const handleRating = (quality: 0 | 3 | 4 | 5) => {
    if (!currentCardId) return;

    updateCardReview(currentCardId, quality);

    // Update stats
    if (quality === 5) setStats(s => ({ ...s, easy: s.easy + 1 }));
    else if (quality === 4) setStats(s => ({ ...s, medium: s.medium + 1 }));
    else if (quality === 3) setStats(s => ({ ...s, hard: s.hard + 1 }));

    // Move to next card
    if (currentCardIndex < sessionCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      setSessionComplete(true);
    }
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (sessionCards.length === 0) {
    return (
      <div className="bg-surface-container border border-border-subtle rounded-2xl p-8 text-center">
        <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="font-display font-bold text-xl text-white mb-2">
          {t('reviewDeck.allCaughtUp')}
        </h3>
        <p className="text-text-secondary mb-6">
          {t('reviewDeck.noCardsDue')}
        </p>
        {onClose && (
          <button
            onClick={onClose}
            className="bg-primary text-surface font-display font-bold px-6 py-3 rounded-xl hover:bg-primary-container transition-colors"
          >
            {t('common.continue')}
          </button>
        )}
      </div>
    );
  }

  if (sessionComplete) {
    const totalTime = Date.now() - startTime;
    // Stats tracked // suppress unused warning = stats.easy + stats.medium + stats.hard;

    return (
      <div className="bg-surface-container border border-border-subtle rounded-2xl p-8">
        <div className="text-center mb-8">
          <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="font-display font-bold text-2xl text-white mb-2">
            {t('reviewDeck.sessionComplete')}
          </h3>
          <div className="flex items-center justify-center gap-2 text-text-secondary">
            <Clock className="w-4 h-4" />
            <span>{formatTime(totalTime)}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-primary/10 rounded-xl p-4 text-center">
            <p className="text-2xl font-display font-bold text-primary">{stats.easy}</p>
            <p className="text-xs text-text-secondary uppercase tracking-wider">{t('reviewDeck.easy')}</p>
          </div>
          <div className="bg-hint/10 rounded-xl p-4 text-center">
            <p className="text-2xl font-display font-bold text-hint">{stats.medium}</p>
            <p className="text-xs text-text-secondary uppercase tracking-wider">{t('reviewDeck.medium')}</p>
          </div>
          <div className="bg-error/10 rounded-xl p-4 text-center">
            <p className="text-2xl font-display font-bold text-error">{stats.hard}</p>
            <p className="text-xs text-text-secondary uppercase tracking-wider">{t('reviewDeck.hard')}</p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="w-full bg-primary text-surface font-display font-bold py-3 rounded-xl hover:bg-primary-container transition-colors"
          >
            {t('common.done')}
          </button>
        )}
      </div>
    );
  }

  if (!currentCard) return null;

  return (
    <div className="bg-surface-container border border-border-subtle rounded-2xl p-6">
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-text-secondary text-sm">
          {t('reviewDeck.cardProgress', { current: currentCardIndex + 1, total: sessionCards.length })}
        </span>
        <div className="flex-1 mx-4 h-2 bg-surface rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${((currentCardIndex + 1) / sessionCards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div className="relative h-64 mb-6 perspective-1000">
        <motion.div
          className="w-full h-full relative preserve-3d cursor-pointer"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => setIsFlipped(!isFlipped)}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 bg-surface rounded-xl border border-border-subtle p-6 flex flex-col items-center justify-center backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <p className="text-text-secondary text-sm mb-4 uppercase tracking-wider">
              {t('reviewDeck.question')}
            </p>
            <p className="text-text-primary text-center text-lg font-body">
              {currentCard.front[lang]}
            </p>
            <p className="text-text-secondary text-xs mt-8 flex items-center gap-2">
              <RotateCw className="w-4 h-4" />
              {t('reviewDeck.tapToFlip')}
            </p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 bg-primary/5 rounded-xl border border-primary/30 p-6 flex flex-col items-center justify-center"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <p className="text-primary text-sm mb-4 uppercase tracking-wider">
              {t('reviewDeck.answer')}
            </p>
            <p className="text-text-primary text-center text-lg font-body">
              {currentCard.back[lang]}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Rating Buttons */}
      <AnimatePresence>
        {isFlipped && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-3 gap-3"
          >
            <button
              onClick={() => handleRating(3)}
              className="p-3 rounded-xl bg-error/10 border border-error/30 text-error font-display font-bold hover:bg-error/20 transition-colors"
            >
              {t('reviewDeck.hard')}
            </button>
            <button
              onClick={() => handleRating(4)}
              className="p-3 rounded-xl bg-hint/10 border border-hint/30 text-hint font-display font-bold hover:bg-hint/20 transition-colors"
            >
              {t('reviewDeck.medium')}
            </button>
            <button
              onClick={() => handleRating(5)}
              className="p-3 rounded-xl bg-primary/10 border border-primary/30 text-primary font-display font-bold hover:bg-primary/20 transition-colors"
            >
              {t('reviewDeck.easy')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!isFlipped && (
        <p className="text-center text-text-secondary text-sm">
          {t('reviewDeck.flipToRate')}
        </p>
      )}
    </div>
  );
}
