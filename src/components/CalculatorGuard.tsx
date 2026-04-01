import { useState } from 'react';
import { Calculator, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CalculatorGuard({ onVerified }: { onVerified?: () => void }) {
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'radian_error' | 'other_error'>('idle');

  const checkCalculator = () => {
    const val = parseFloat(inputValue);
    
    // sin(30 degrees) = 0.5
    // sin(30 radians) = -0.988

    if (Math.abs(val - 0.5) < 0.01) {
      setStatus('success');
      if (onVerified) onVerified();
    } else if (Math.abs(val - -0.988) < 0.05) {
      setStatus('radian_error');
    } else {
      setStatus('other_error');
    }
  };

  return (
    <div className="bg-surface-container border border-border-subtle rounded-2xl p-6 md:p-8 max-w-xl mx-auto shadow-xl">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Calculator className="w-6 h-6" />
        </div>
         <div>
            <h3 className="font-display font-bold text-xl text-white">Vérification de la Calculatrice</h3>
            <p className="text-text-secondary text-sm">Avant de commencer, assurons-nous que votre outil est bien réglé.</p>
         </div>
      </div>

      <div className="bg-surface border border-border-subtle rounded-xl p-6 text-center mb-6">
        <p className="text-text-primary mb-4">
          Prenez votre calculatrice et tapez exactement <strong className="font-math bg-primary/20 text-primary px-2 py-1 rounded">sin(30)</strong> ou <strong className="font-math bg-primary/20 text-primary px-2 py-1 rounded">30 sin</strong> selon le modèle, puis appuyez sur "=".
        </p>
        <p className="text-text-secondary text-sm mb-4">Quel résultat obtenez-vous ?</p>
        
        <div className="flex max-w-xs mx-auto flex-col gap-4">
           <input 
             type="number" 
             value={inputValue}
             onChange={(e) => setInputValue(e.target.value)}
             placeholder="Ex: 0.5"
             className="w-full bg-surface-container border border-border-subtle rounded-xl px-4 py-3 text-white font-math focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-center"
           />
           <button 
             onClick={checkCalculator}
             disabled={!inputValue}
             className="w-full bg-primary text-surface font-display font-bold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-container transition-colors"
           >
             Vérifier
           </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {status === 'success' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="flex items-start gap-4 p-4 rounded-xl bg-primary/10 text-primary border border-primary/20"
          >
            <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" />
            <div>
               <h4 className="font-display font-bold">Parfait !</h4>
               <p className="text-sm opacity-90">Votre calculatrice est bien en mode <strong>Degrés (DEG)</strong>. Vous êtes prêt(e).</p>
            </div>
          </motion.div>
        )}

        {status === 'radian_error' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="flex items-start gap-4 p-4 rounded-xl bg-[#FFD166]/10 text-[#FFD166] border border-[#FFD166]/20"
          >
            <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5" />
            <div>
               <h4 className="font-display font-bold">Attention au mode !</h4>
               <p className="text-sm opacity-90 mb-2">Vous avez obtenu <strong>-0.988</strong> car votre calculatrice est en mode <strong>Radian (RAD)</strong>.</p>
               <p className="text-sm opacity-90 bg-[#FFD166]/10 p-2 rounded">Cherchez le bouton <kbd className="font-math text-xs bg-surface-container px-1 py-0.5 rounded border border-border-subtle">DRG</kbd> ou <kbd className="font-math text-xs bg-surface-container px-1 py-0.5 rounded border border-border-subtle">MODE</kbd> et changez-le en mode <strong>DEG</strong>.</p>
            </div>
          </motion.div>
        )}

        {status === 'other_error' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="flex items-start gap-4 p-4 rounded-xl bg-[#FF6B6B]/10 text-[#FF6B6B] border border-[#FF6B6B]/20"
          >
            <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5" />
            <div>
               <h4 className="font-display font-bold">Erreur de saisie</h4>
               <p className="text-sm opacity-90">Ce résultat n'est pas attendu. Assurez-vous d'avoir bien tapé <code className="bg-surface font-math px-1 rounded">sin(30)</code> et non pas autre chose.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
