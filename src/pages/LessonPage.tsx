import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProgressStore } from '../store/progressStore';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

import modulesFR from '../data/modules/fr.json';
import modulesEN from '../data/modules/en.json';
import TriangleExplorer from '../components/TriangleExplorer';
import DiagramLabeler from '../components/DiagramLabeler';

export default function LessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  const completeLesson = useProgressStore(state => state.completeLesson);
  const completedLessons = useProgressStore(state => state.completedLessons);

  const modulesData = i18n.language === 'en' ? modulesEN : modulesFR;

  // Find lesson data
  let lesson: any = null;
  let parentModule: any = null;
  for (const mod of modulesData) {
    const l = mod.lessons.find((x: any) => x.lessonId === lessonId);
    if (l) {
      lesson = l;
      parentModule = mod;
      break;
    }
  }

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasValidated, setHasValidated] = useState(false);

  if (!lesson) {
    return <div className="p-8 text-white">Lesson not found.</div>;
  }

  const contentCount = lesson.content.length;
  const item = lesson.content[currentStep];

  const handleNext = () => {
     if (currentStep < contentCount - 1) {
       setCurrentStep(prev => prev + 1);
       setSelectedOption(null);
       setHasValidated(false);
     } else {
       // Finish Lesson
       completeLesson(lesson.lessonId, parentModule.moduleId);
       navigate('/');
     }
  };

  const handleValidate = () => {
    if (item.type === 'check') {
       setHasValidated(true);
    }
  };

  const isComplete = completedLessons.includes(lesson.lessonId);

  return (
    <div className="min-h-full p-4 md:p-8 max-w-4xl mx-auto flex flex-col gap-6">
      
      {/* Header */}
      <button onClick={() => navigate('/')} className="text-text-secondary hover:text-white flex items-center gap-2 font-display uppercase tracking-widest text-sm mb-4 w-fit">
        <ArrowLeft className="w-4 h-4" />
        Retour au menu
      </button>

      <div className="flex items-center justify-between pb-6 border-b border-border-subtle">
        <div>
           <div className="text-primary font-display font-bold uppercase text-xs mb-2">Module {parentModule.moduleId} • Étap {currentStep + 1}/{contentCount}</div>
           <h1 className="text-3xl font-display font-bold text-white">{lesson.title}</h1>
        </div>
        {isComplete && <div className="p-2 bg-primary/10 text-primary rounded-full"><CheckCircle2 className="w-6 h-6" /></div>}
      </div>

      {/* Lesson Content Area */}
      <div className="flex-1 my-6 text-lg font-body leading-relaxed space-y-8 animate-in fade-in zoom-in-95 duration-300">
         
         {item.type === 'text' && (
           <div className="prose prose-invert max-w-none">
              <p>{item.body}</p>
           </div>
         )}

         {item.type === 'explorer' && (
           <div className="space-y-6">
             <div className="bg-surface-container border border-primary/30 p-4 rounded-xl text-primary font-display italic">
               {item.prompt}
             </div>
             {lesson.explorerConfig?.mode === 'label_exploration' ? <DiagramLabeler /> : <TriangleExplorer />}
           </div>
         )}

         {item.type === 'check' && (
           <div className="bg-surface-container border border-border-subtle p-6 rounded-2xl space-y-6">
             <h3 className="font-display font-bold text-xl text-white">{item.question}</h3>
             
             <div className="space-y-3">
               {item.options.map((opt: string, idx: number) => {
                  let classes = "w-full text-left p-4 rounded-xl border font-display transition-colors ";
                  if (hasValidated) {
                    if (idx === item.correct) classes += "bg-primary/20 border-primary text-primary";
                    else if (idx === selectedOption) classes += "bg-[#FF6B6B]/20 border-[#FF6B6B] text-[#FF6B6B]";
                    else classes += "bg-surface border-border-subtle text-text-secondary opacity-50";
                  } else {
                    classes += idx === selectedOption ? "bg-primary text-surface border-primary" : "bg-surface border-border-subtle text-white hover:border-text-secondary";
                  }

                  return (
                    <button 
                      key={idx} 
                      onClick={() => !hasValidated && setSelectedOption(idx)}
                      className={classes}
                      disabled={hasValidated}
                    >
                      {opt}
                    </button>
                  );
               })}
             </div>

             {hasValidated && (
               <div className={`p-4 rounded-xl font-body ${selectedOption === item.correct ? 'bg-primary/10 text-primary' : 'bg-[#FF6B6B]/10 text-[#FF6B6B]'}`}>
                  {selectedOption === item.correct ? t('game.correct') : t('game.incorrect')} {item.explanation}
               </div>
             )}
           </div>
         )}

      </div>

      {/* Footer Navigation */}
      <div className="pt-6 border-t border-border-subtle flex justify-end">
         {item.type === 'check' && !hasValidated ? (
           <button 
             onClick={handleValidate} 
             disabled={selectedOption === null}
             className="px-8 py-3 bg-primary text-surface font-display font-bold rounded-xl hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed"
           >
             {t('game.validate')}
           </button>
         ) : (
           <button 
             onClick={handleNext} 
             className="px-8 py-3 bg-primary text-surface font-display font-bold rounded-xl hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed"
             disabled={item.type === 'check' && (!hasValidated || selectedOption !== item.correct)}
           >
             Continuer
           </button>
         )}
      </div>

    </div>
  );
}
