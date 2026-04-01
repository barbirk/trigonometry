import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Target, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Position = 'hypotenuse' | 'opposite' | 'adjacent';

const DiagramLabeler = () => {
  const { t } = useTranslation();

  // Selected label to "place"
  const [selectedLabel, setSelectedLabel] = useState<Position | null>(null);

  // Current placement state: what label is assigned to what visual position
  const [placements, setPlacements] = useState<Record<Position, Position | null>>({
    hypotenuse: null,
    opposite: null,
    adjacent: null
  });

  const [hasValidated, setHasValidated] = useState(false);

  // Hardcoded visual triangle metrics
  const base = 400;
  const height = 300;
  const svgWidth = 600;
  const svgHeight = 400;
  const padding = 60; // Extra padding for the labels.

  const toSVGX = (x: number) => padding + x;
  const toSVGY = (y: number) => svgHeight - padding - y;

  // The true locations array.
  const slots: { id: Position, x: number, y: number, labelBase: string }[] = [
    { id: 'adjacent', x: toSVGX(base / 2), y: toSVGY(-30), labelBase: "Adjacent" },
    { id: 'opposite', x: toSVGX(-30), y: toSVGY(height / 2), labelBase: "Opposé" },
    { id: 'hypotenuse', x: toSVGX(base / 2) + 20, y: toSVGY(height / 2) + 20, labelBase: "Hypoténuse" }
  ];

  const handleSlotClick = (slotId: Position) => {
    // If we have a selected block, assign it
    if (selectedLabel) {
      setPlacements(prev => {
        // Remove label from anywhere else it might be
        const newPlacements = { ...prev };
        (Object.keys(newPlacements) as Position[]).forEach(k => {
          if (newPlacements[k] === selectedLabel) {
            newPlacements[k] = null;
          }
        });
        // Place it here
        newPlacements[slotId] = selectedLabel;
        return newPlacements;
      });
      setSelectedLabel(null);
      setHasValidated(false);
    } else {
      // If no label is selected but we click a filled slot, return it to the pool
      if (placements[slotId]) {
        setPlacements(prev => ({ ...prev, [slotId]: null }));
        setHasValidated(false);
      }
    }
  };

  const handleLabelClick = (label: Position) => {
    // If it's already placed, clicking it in the bank does nothing or resets it
    if (Object.values(placements).includes(label)) {
      // Find where it's placed and remove it
      setPlacements(prev => {
        const reset = { ...prev };
        (Object.keys(reset) as Position[]).forEach(k => {
          if (reset[k] === label) reset[k] = null;
        });
        return reset;
      });
      setSelectedLabel(label); // Auto select it for moving
    } else {
      setSelectedLabel(selectedLabel === label ? null : label);
    }
  };

  const checkResults = () => {
    if (hasValidated && !allCorrect) {
      setHasValidated(false);
      setPlacements({ hypotenuse: null, opposite: null, adjacent: null });
      setSelectedLabel(null);
    } else {
      setHasValidated(true);
    }
  };

  const isComplete = Object.values(placements).every(v => v !== null);
  const allCorrect = Object.entries(placements).every(([slotId, labelId]) => slotId === labelId);

  return (
    <div className="bg-surface-container border border-border-subtle rounded-2xl p-6 shadow-xl max-w-4xl mx-auto flex flex-col gap-6">
      
      <div className="flex items-center gap-3">
        <Target className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-display font-bold text-white">Identification de Triangle</h2>
      </div>

      <p className="text-text-secondary">Sélectionnez une étiquette bleue ci-dessous, puis cliquez sur la zone pointillée correspondante sur le triangle pour attribuer le terme correct.</p>

      {/* Triangle Viewport */}
      <div className="relative bg-[#151822] rounded-xl flex items-center justify-center min-h-[450px]">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full max-h-[450px] overflow-visible">
           {/* Right angle */}
           <path d={`M ${toSVGX(20)} ${toSVGY(0)} L ${toSVGX(20)} ${toSVGY(20)} L ${toSVGX(0)} ${toSVGY(20)}`} fill="none" stroke="var(--color-text-secondary)" strokeWidth="2" />
           {/* Triangle body */}
           <polygon points={`${toSVGX(0)},${toSVGY(0)} ${toSVGX(base)},${toSVGY(0)} ${toSVGX(0)},${toSVGY(height)}`} fill="var(--color-primary)" fillOpacity="0.05" stroke="var(--color-primary)" strokeWidth="2" strokeDasharray="4 4"/>
           
           {/* Reference Angle indicator */}
           <path d={`M ${toSVGX(base - 30)} ${toSVGY(0)} A 30 30 0 0 1 ${toSVGX(base - 30 * Math.cos(Math.atan2(height, base)))} ${toSVGY(30 * Math.sin(Math.atan2(height, base)))}`} fill="none" stroke="white" strokeWidth="2"/>
           <circle cx={toSVGX(base - 10)} cy={toSVGY(10)} r="3" fill="var(--color-primary)" />
        </svg>

        {/* Overlay slots allowing DOM (Text and Buttons) logic instead of SVG texts */}
        {slots.map((slot) => {
          const placedLabel = placements[slot.id];
          const isSlotCorrect = hasValidated && placedLabel === slot.id;
          const isSlotWrong = hasValidated && placedLabel && placedLabel !== slot.id;

          return (
            <div 
              key={slot.id}
              onClick={() => handleSlotClick(slot.id)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all active:scale-95"
              style={{ left: `${(slot.x / svgWidth) * 100}%`, top: `${(slot.y / svgHeight) * 100}%` }}
            >
              <div className={`
                px-4 py-2 rounded-lg font-display text-base tracking-wide border-2 min-w-[120px] text-center
                ${placedLabel ? 'bg-surface border-primary text-white shadow-lg shadow-primary/20' : 'bg-surface-container/50 border-dashed border-text-secondary/50 text-text-secondary/30'}
                ${isSlotCorrect ? '!border-primary !text-primary' : ''}
                ${isSlotWrong ? '!border-[#FF6B6B] !text-[#FF6B6B]' : ''}
                ${selectedLabel && !placedLabel ? 'border-primary/50 bg-primary/10 animate-pulse' : ''}
              `}>
                {placedLabel ? t(`explorer.${placedLabel}`) : '?'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bank of words */}
      <div className="flex items-center gap-4 bg-surface p-4 rounded-xl border border-border-subtle">
         {['hypotenuse', 'opposite', 'adjacent'].map((label) => {
           const l = label as Position;
           const isPlaced = Object.values(placements).includes(l);
           const isSelected = selectedLabel === l;

           return (
             <button 
               key={l}
               onClick={() => handleLabelClick(l)}
               className={`
                 flex-1 py-3 px-4 rounded-lg font-display font-bold transition-all
                 ${isPlaced ? 'opacity-30 border border-border-subtle cursor-default line-through' : 'cursor-pointer shadow-sm hover:shadow-md'}
                 ${isSelected ? 'bg-primary text-surface border-2 border-primary ring-4 ring-primary/20 scale-105' : 'bg-surface-container border border-border-subtle text-white'}
               `}
               disabled={isPlaced && !isSelected}
             >
               {t(`explorer.${l}`)}
             </button>
           );
         })}
      </div>
      
      {/* Verify Button */}
      <div className="flex justify-end pt-4 border-t border-border-subtle">
        <AnimatePresence>
          {hasValidated && allCorrect && (
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="flex items-center gap-2 text-primary font-bold mr-auto"
            >
              <CheckCircle2 className="w-5 h-5" />
              Parfait ! Vous avez maîtrisé le vocabulaire.
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={checkResults}
          disabled={!isComplete}
          className={`
            px-8 py-3 rounded-xl font-display font-bold transition-all
            ${isComplete 
              ? 'bg-primary text-surface hover:bg-primary-container hover:-translate-y-1 shadow-lg shadow-primary/25' 
              : 'bg-surface border border-border-subtle text-text-secondary cursor-not-allowed'}
          `}
        >
          {hasValidated && !allCorrect ? 'Réessayer' : t('game.validate')}
        </button>
      </div>

    </div>
  );
}

export default DiagramLabeler;
