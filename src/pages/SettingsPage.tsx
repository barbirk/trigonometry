import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, Bell, Calculator, Moon, Globe, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProgressStore } from '../store/progressStore';
import { useState } from 'react';

export default function SettingsPage() {
  const { t, i18n } = useTranslation();
  const resetProgress = useProgressStore(state => state.resetProgress);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [calculatorCheck, setCalculatorCheck] = useState(true);

  const handleReset = () => {
    resetProgress();
    setShowResetConfirm(false);
    window.location.href = '/';
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

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
          <h1 className="text-2xl font-display font-bold text-white">{t('settings.title')}</h1>
          <p className="text-text-secondary">{t('settings.subtitle')}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Language */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container border border-border-subtle rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white">{t('settings.language')}</h3>
                <p className="text-text-secondary text-sm">{t('settings.languageDesc')}</p>
              </div>
            </div>
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-surface border border-border-subtle rounded-lg font-display font-bold text-white hover:border-primary transition-colors"
            >
              {i18n.language === 'fr' ? 'FR → EN' : 'EN → FR'}
            </button>
          </div>
        </motion.div>

        {/* Calculator Guard */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface-container border border-border-subtle rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-hint/10 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-hint" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white">{t('settings.calculatorGuard')}</h3>
                <p className="text-text-secondary text-sm">{t('settings.calculatorGuardDesc')}</p>
              </div>
            </div>
            <button
              onClick={() => setCalculatorCheck(!calculatorCheck)}
              className={`w-14 h-8 rounded-full transition-colors relative ${
                calculatorCheck ? 'bg-primary' : 'bg-surface border border-border-subtle'
              }`}
            >
              <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${
                calculatorCheck ? 'left-7' : 'left-1'
              }`} />
            </button>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface-container border border-border-subtle rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-error" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white">{t('settings.notifications')}</h3>
                <p className="text-text-secondary text-sm">{t('settings.notificationsDesc')}</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-14 h-8 rounded-full transition-colors relative ${
                notifications ? 'bg-primary' : 'bg-surface border border-border-subtle'
              }`}
            >
              <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${
                notifications ? 'left-7' : 'left-1'
              }`} />
            </button>
          </div>
        </motion.div>

        {/* Dark Mode (Placeholder) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface-container border border-border-subtle rounded-2xl p-6 opacity-50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center">
                <Moon className="w-5 h-5 text-text-secondary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white">{t('settings.darkMode')}</h3>
                <p className="text-text-secondary text-sm">{t('settings.comingSoon')}</p>
              </div>
            </div>
            <span className="text-text-secondary text-sm">{t('settings.alwaysOn')}</span>
          </div>
        </motion.div>

        {/* Reset Progress */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-error/5 border border-error/30 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-error" />
              </div>
              <div>
                <h3 className="font-display font-bold text-error">{t('settings.resetProgress')}</h3>
                <p className="text-text-secondary text-sm">{t('settings.resetProgressDesc')}</p>
              </div>
            </div>
            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-4 py-2 bg-error text-white rounded-lg font-display font-bold hover:bg-error/80 transition-colors"
            >
              {t('settings.reset')}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface-container border border-error/30 rounded-2xl p-6 max-w-md w-full"
          >
            <div className="flex items-center gap-3 text-error mb-4">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-display font-bold text-lg">{t('settings.confirmReset')}</h3>
            </div>
            <p className="text-text-secondary mb-6">
              {t('settings.resetWarning')}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-3 bg-surface border border-border-subtle rounded-xl font-display font-bold text-white hover:border-text-secondary transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-3 bg-error text-white rounded-xl font-display font-bold hover:bg-error/80 transition-colors"
              >
                {t('settings.confirmReset')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
