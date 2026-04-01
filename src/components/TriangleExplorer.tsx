import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Ruler, TriangleRight } from 'lucide-react';

const TriangleExplorer = () => {
  const { t } = useTranslation();
  
  // Triangle configuration (in mathematical coordinate space, we will map it to SVG)
  // Let the right angle be at (0, 0) for ease, bounding box 600x400
  const [base, setBase] = useState(400); // Adjacent
  const [height, setHeight] = useState(300); // Opposite

  // SVG Dimension constants
  const svgWidth = 600;
  const svgHeight = 400;
  const padding = 40;

  // Calculate hypotenuse and angle
  const hypotenuse = Math.sqrt(base * base + height * height);
  const angleRad = Math.atan2(height, base);
  const angleDeg = (angleRad * 180 / Math.PI).toFixed(1);

  const sinVal = (height / hypotenuse).toFixed(3);
  const cosVal = (base / hypotenuse).toFixed(3);
  const tanVal = (height / base).toFixed(3);

  // Math-to-SVG Coordinate mapping (bottom-left origin)
  const toSVGX = (x: number) => padding + x;
  const toSVGY = (y: number) => svgHeight - padding - y;

  const handleBaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setBase(Number(e.target.value));
  };
  
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setHeight(Number(e.target.value));
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto flex flex-col xl:flex-row gap-8">
      
      {/* Interactive Visualizer */}
      <div className="flex-1 bg-surface-container border border-border-subtle rounded-2xl overflow-hidden flex flex-col">
         <div className="p-4 border-b border-border-subtle bg-surface/50 text-text-secondary font-display text-sm tracking-widest uppercase font-bold flex items-center justify-between">
            <span>{t('explorer.title')}</span>
            <TriangleRight className="w-5 h-5 text-primary" />
         </div>
         
         <div className="flex-1 relative bg-[#151822] flex items-center justify-center p-8 min-h-[400px]">
            <svg 
              viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
              className="w-full h-full max-h-[500px] overflow-visible drop-shadow-2xl"
            >
               {/* Grid background 
               <defs>
                 <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                   <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(136, 146, 164, 0.05)" strokeWidth="1"/>
                 </pattern>
               </defs>
               <rect width="100%" height="100%" fill="url(#grid)" />
               */}

               {/* Right angle marker */}
               <path 
                 d={`M ${toSVGX(20)} ${toSVGY(0)} L ${toSVGX(20)} ${toSVGY(20)} L ${toSVGX(0)} ${toSVGY(20)}`}
                 fill="none" 
                 stroke="var(--color-text-secondary)" 
                 strokeWidth="2"
               />

               {/* The Triangle Fill */}
               <polygon 
                 points={`
                   ${toSVGX(0)},${toSVGY(0)} 
                   ${toSVGX(base)},${toSVGY(0)} 
                   ${toSVGX(0)},${toSVGY(height)}
                 `} 
                 fill="var(--color-primary)" 
                 fillOpacity="0.1"
               />
               
               {/* Adjacent ({t('explorer.base')}) */}
               <line 
                 x1={toSVGX(0)} y1={toSVGY(0)} 
                 x2={toSVGX(base)} y2={toSVGY(0)} 
                 stroke="#8892A4" 
                 strokeWidth="4" 
               />
               
               {/* Opposite (Height) */}
               <line 
                 x1={toSVGX(0)} y1={toSVGY(0)} 
                 x2={toSVGX(0)} y2={toSVGY(height)} 
                 stroke="#FF6B6B" 
                 strokeWidth="4" 
               />

               {/* Hypotenuse */}
               <line 
                 x1={toSVGX(base)} y1={toSVGY(0)} 
                 x2={toSVGX(0)} y2={toSVGY(height)} 
                 stroke="var(--color-primary)" 
                 strokeWidth="4" 
               />

               {/* Vertices */}
               <circle cx={toSVGX(base)} cy={toSVGY(0)} r="6" fill="#8892A4" />
               <circle cx={toSVGX(0)} cy={toSVGY(height)} r="6" fill="#FF6B6B" />
               <circle cx={toSVGX(0)} cy={toSVGY(0)} r="6" fill="white" />

               {/* Labels */}
               <text x={toSVGX(base / 2)} y={toSVGY(-25)} fill="#8892A4" className="font-display text-lg" textAnchor="middle">{t('triangle.adjacent')} ({base})</text>
               <text x={toSVGX(-25)} y={toSVGY(height / 2)} fill="#FF6B6B" className="font-display text-lg" textAnchor="middle" transform={`rotate(-90, ${toSVGX(-25)}, ${toSVGY(height / 2)})`}>{t('triangle.opposite')} ({height})</text>
               
               {/* Angle Arc at base vertex */}
               <path 
                 d={`M ${toSVGX(base - 40)} ${toSVGY(0)} A 40 40 0 0 1 ${toSVGX(base - 40 * Math.cos(angleRad))} ${toSVGY(40 * Math.sin(angleRad))}`}
                 fill="none" 
                 stroke="white" 
                 strokeWidth="2"
               />
               <text x={toSVGX(base - 60)} y={toSVGY(15)} fill="white" className="font-display font-bold text-lg">{angleDeg}°</text>
            </svg>
         </div>

         {/* Controls */}
         <div className="p-6 bg-surface-container border-t border-border-subtle grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
               <label className="flex justify-between font-display text-sm text-text-secondary mb-2">
                 <span>{t('triangle.adjacent')} (Base)</span>
                 <span className="text-white">{base} {t('explorer.units')}</span>
               </label>
               <input 
                 type="range" min="50" max="500" step="1" 
                 value={base} onChange={handleBaseChange} 
                 className="w-full accent-text-secondary"
               />
            </div>
            <div>
               <label className="flex justify-between font-display text-sm text-text-secondary mb-2">
                 <span className="text-[#FF6B6B]">{t('triangle.opposite')} ({t('explorer.height')})</span>
                 <span className="text-white">{height} {t('explorer.units')}</span>
               </label>
               <input 
                 type="range" min="50" max="350" step="1" 
                 value={height} onChange={handleHeightChange} 
                 className="w-full accent-[#FF6B6B]"
               />
            </div>
         </div>
      </div>

      {/* Ratios Sidebar */}
      <div className="xl:w-80 flex flex-col gap-4">
         <div className="bg-surface-container border border-border-subtle rounded-2xl p-6 shadow-xl">
            <h3 className="font-display font-bold text-xl text-white mb-6 flex items-center gap-2">
              <Ruler className="w-5 h-5 text-primary" />
              {t('explorer.reports')}
            </h3>

            <div className="space-y-6 font-math text-lg">
               {/* SINE */}
               <div className="p-4 rounded-xl bg-surface/50 border border-border-subtle relative overflow-hidden group hover:border-[#FF6B6B]/30 transition-colors">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#FF6B6B]"></div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-text-secondary">sin({angleDeg}°)</span>
                    <span className="font-bold text-[#FF6B6B]">{sinVal}</span>
                  </div>
                  <div className="text-sm text-text-secondary/70 border-t border-border-subtle pt-2 mt-2">
                    {t('triangle.opposite')} ({height}) / {t('triangle.hypotenuse')} ({hypotenuse.toFixed(1)})
                  </div>
               </div>

               {/* COSINE */}
               <div className="p-4 rounded-xl bg-surface/50 border border-border-subtle relative overflow-hidden group hover:border-text-secondary/50 transition-colors">
                  <div className="absolute top-0 left-0 w-1 h-full bg-text-secondary"></div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-text-secondary">cos({angleDeg}°)</span>
                    <span className="font-bold text-text-secondary">{cosVal}</span>
                  </div>
                  <div className="text-sm text-text-secondary/70 border-t border-border-subtle pt-2 mt-2">
                    {t('triangle.adjacent')} ({base}) / {t('triangle.hypotenuse')} ({hypotenuse.toFixed(1)})
                  </div>
               </div>

               {/* TANGENT */}
               <div className="p-4 rounded-xl bg-surface/50 border border-border-subtle relative overflow-hidden group hover:border-primary/50 transition-colors">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary/50"></div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-text-secondary">tan({angleDeg}°)</span>
                    <span className="font-bold text-primary">{tanVal}</span>
                  </div>
                  <div className="text-sm text-text-secondary/70 border-t border-border-subtle pt-2 mt-2">
                    {t('triangle.opposite')} ({height}) / {t('triangle.adjacent')} ({base})
                  </div>
               </div>
            </div>
         </div>
         
         <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
            <h4 className="font-display font-bold text-primary mb-2">{t('explorer.tip')}</h4>
            <p className="text-sm text-text-secondary font-body leading-relaxed">
              {t('explorer.sinHint')}
            </p>
         </div>
      </div>
    </div>
  );
};

export default TriangleExplorer;
