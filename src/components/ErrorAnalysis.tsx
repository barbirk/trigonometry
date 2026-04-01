import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle2, XCircle, Eye, EyeOff } from 'lucide-react';

interface ErrorAnalysisProps {
  exercise: {
    id: string;
    question: { en: string; fr: string };
    steps: { en: string[]; fr: string[] };
    error: {
      step: number;
      mistake: string;
      correct: string;
    };
    explanation: { en: string; fr: string };
  };
  onComplete?: (result: { correct: boolean; attempts: number }) => void;
}

export default function ErrorAnalysis({ exercise, onComplete }: ErrorAnalysisProps) {
  const { t, i18n } = useTranslation();
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [explanationText, setExplanationText] = useState('');

  const lang = i18n.language as 'en' | 'fr';
  const steps = exercise.steps[lang];

  const handleSubmit = () => {
    if (selectedStep === null || explanationText.length < 10) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    const correct = selectedStep === exercise.error.step;
    setIsCorrect(correct);
    setShowExplanation(true);

    if (onComplete) {
      onComplete({ correct, attempts: newAttempts });
    }
  };

  return (
    <div className="bg-surface-container border border-border-subtle rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-hint/10 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-hint" />
        </div>
        <div>
          <h3 className="font-display font-bold text-lg text-white">
            {t('errorAnalysis.title')}
          </h3>
          <p className="text-text-secondary text-sm">
            {t('errorAnalysis.subtitle')}
          </p>
        </div>
      </div>

      {/* Problem Statement */}
      <div className="bg-surface p-4 rounded-xl border border-border-subtle mb-6">
        <p className="text-text-primary">{exercise.question[lang]}</p>
      </div>

      {/* Steps */}
      <div className="space-y-3 mb-6">
        <p className="text-text-secondary text-sm mb-3">
          {t('errorAnalysis.selectStepPrompt')}
        </p>
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => !showExplanation && setSelectedStep(index)}
            disabled={showExplanation}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
              selectedStep === index
                ? 'border-hint bg-hint/10'
                : 'border-border-subtle hover:border-hint/50'
            } ${showExplanation && index === exercise.error.step ? 'border-error bg-error/10' : ''}`}
          >
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-surface border border-border-subtle flex items-center justify-center text-xs font-mono">
                {index + 1}
              </span>
              <span className="font-math text-text-primary">{step}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Explanation Input */}
      {!showExplanation && (
        <div className="space-y-4">
          <div>
            <label className="block text-text-secondary text-sm mb-2">
              {t('errorAnalysis.explainError')}
            </label>
            <textarea
              value={explanationText}
              onChange={(e) => setExplanationText(e.target.value)}
              placeholder={t('errorAnalysis.explanationPlaceholder')}
              rows={3}
              className="w-full bg-surface border border-border-subtle rounded-xl px-4 py-3 text-white focus:border-hint focus:ring-1 focus:ring-hint outline-none resize-none"
            />
            <p className="text-text-secondary text-xs mt-1">
              {explanationText.length} / {t('errorAnalysis.minChars', { count: 10 })}
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={selectedStep === null || explanationText.length < 10}
            className="w-full bg-hint text-surface font-display font-bold py-3 rounded-xl disabled:opacity-50 hover:bg-hint/80 transition-colors"
          >
            {t('common.submit')}
          </button>
        </div>
      )}

      {/* Feedback */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 space-y-4"
          >
            <div
              className={`p-4 rounded-xl border ${
                isCorrect
                  ? 'bg-primary/10 border-primary/30'
                  : 'bg-error/10 border-error/30'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-display font-bold text-primary">
                      {t('errorAnalysis.correctSpot')}
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-error" />
                    <span className="font-display font-bold text-error">
                      {t('errorAnalysis.notQuite')}
                    </span>
                  </>
                )}
              </div>
              <p className="text-text-primary">{exercise.explanation[lang]}</p>
            </div>

            {!isCorrect && (
              <div className="p-4 bg-surface rounded-xl border border-border-subtle">
                <p className="text-text-secondary text-sm mb-2">
                  {t('errorAnalysis.theErrorWas')}
                </p>
                <p className="font-math text-error mb-3">{exercise.error.mistake}</p>
                <p className="text-text-secondary text-sm mb-2">
                  {t('errorAnalysis.shouldHaveBeen')}
                </p>
                <p className="font-math text-primary">{exercise.error.correct}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
