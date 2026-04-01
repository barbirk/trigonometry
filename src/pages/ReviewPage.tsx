import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewDeck from '../components/ReviewDeck';

export default function ReviewPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-full p-4 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link 
          to="/"
          className="p-2 rounded-lg hover:bg-surface-container transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-text-secondary" />
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-white">{t('review.title')}</h1>
          <p className="text-text-secondary">{t('review.subtitle')}</p>
        </div>
      </div>

      {/* Info Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface-container border border-border-subtle rounded-2xl p-6 mb-8"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <BrainCircuit className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-white mb-2">
              {t('review.howItWorks')}
            </h2>
            <p className="text-text-secondary">
              {t('review.description')}
            </p>
            <ul className="mt-4 space-y-2 text-text-secondary text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {t('review.easyDesc')}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-hint" />
                {t('review.mediumDesc')}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-error" />
                {t('review.hardDesc')}
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Review Deck */}
      <ReviewDeck onClose={() => window.location.href = '/'} />
    </div>
  );
}
