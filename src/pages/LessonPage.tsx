import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProgressStore } from '../store/progressStore';
import { ArrowLeft, CheckCircle2, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import modulesFR from '../data/modules/fr.json';
import modulesEN from '../data/modules/en.json';
import TriangleExplorer from '../components/TriangleExplorer';
import DiagramLabeler from '../components/DiagramLabeler';
import LessonDiagram from '../components/LessonDiagram';

import StepSolver from '../components/StepSolver';
import ErrorAnalysis from '../components/ErrorAnalysis';
import TeachBackPrompt from '../components/TeachBackPrompt';
import ModuleQuiz from '../components/ModuleQuiz';
import problemsImport from '../data/problems/index.json';

// Ensure modules data is properly typed
const typedModulesFR = modulesFR as any[];
const typedModulesEN = modulesEN as any[];
const problemsData = (problemsImport as any).problems || problemsImport;


export default function LessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  const completeLesson = useProgressStore(state => state.completeLesson);
  const completeModule = useProgressStore(state => state.completeModule);
  const completedLessons = useProgressStore(state => state.completedLessons);
  const teachBackScores = useProgressStore(state => state.teachBackScores);

  const modulesData = i18n.language === 'en' ? typedModulesEN : typedModulesFR;

  // Find lesson data
  let lesson: any = null;
  let parentModule: any = null;
  let lessonIndex = -1;
  for (const mod of modulesData || []) {
    if (!mod?.lessons?.length) continue;
    const idx = mod.lessons.findIndex((x: any) => x?.lessonId === lessonId);
    if (idx !== -1) {
      lesson = mod.lessons[idx];
      lessonIndex = idx;
      parentModule = mod;
      break;
    }
  }

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasValidated, setHasValidated] = useState(false);

  const [showTeachBack, setShowTeachBack] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [teachBackCompleted, setTeachBackCompleted] = useState(false);

  if (!lesson || !parentModule) {
    return <div className="p-8 text-white">{t('lesson.notFound')}</div>;
  }

  const isLastLesson = lessonIndex === (parentModule?.lessons?.length || 0) - 1;
  const teachBackScore = teachBackScores[parentModule.moduleId];
  const quizUnlocked = teachBackScore && teachBackScore >= 2;

  const contentCount = lesson.content.length;
  const item = lesson.content[currentStep];

  const handleNext = () => {
     console.log('[handleNext] Current step:', currentStep, 'of', contentCount, 'lesson:', lesson?.lessonId);
     if (currentStep < contentCount - 1) {
       setCurrentStep(prev => prev + 1);
       setSelectedOption(null);
       setHasValidated(false);
     } else {
       // Finish Lesson
       console.log('[handleNext] Finishing lesson:', lesson?.lessonId, 'module:', parentModule?.moduleId);
       completeLesson(lesson.lessonId, parentModule.moduleId);
       
       // If last lesson, show teach-back
       if (isLastLesson) {
         setShowTeachBack(true);
       } else {
         navigate('/');
       }
     }
  };

  const handleValidate = () => {
    if (item.type === 'check') {
       setHasValidated(true);
    }
  };

  const handleTeachBackComplete = (result: { score: number; passed: boolean }) => {
    setTeachBackCompleted(true);
    if (result.passed) {
      setShowTeachBack(false);
      // Module 0 doesn't have a quiz, so skip to completion
      if (parentModule?.moduleId === 0) {
        completeModule(0, 100, result.score);
        navigate('/');
      } else {
        setShowQuiz(true);
      }
    }
  };

  const handleQuizComplete = (_score: number) => {
    // Quiz completion handled in ModuleQuiz component
  };

  const isComplete = completedLessons.includes(lesson.lessonId);

  // Get a problem for StepSolver if needed
  const sampleProblem = problemsData?.find?.((p: any) => p?.moduleId === parentModule?.moduleId);
  
  // Get error analysis exercise
  const errorExercise = problemsData?.find?.((p: any) => 
    p?.moduleId === parentModule?.moduleId && p?.type === 'error_analysis'
  );

  // Teach-back after last lesson
  if (showTeachBack && isLastLesson) {
    return (
      <div className="min-h-full p-4 md:p-8 max-w-4xl mx-auto">
        <button onClick={() => navigate('/')} className="text-text-secondary hover:text-white flex items-center gap-2 font-display uppercase tracking-widest text-sm mb-8 w-fit">
          <ArrowLeft className="w-4 h-4" />
          {t('common.back')}
        </button>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-6">
            <h1 className="text-3xl font-display font-bold text-white mb-2">{t('teachBack.moduleComplete')}</h1>
            <p className="text-text-secondary">{t('teachBack.beforeQuiz')}</p>
          </div>
          <TeachBackPrompt 
            moduleId={parentModule.moduleId} 
            concept={parentModule.title}
            onComplete={handleTeachBackComplete}
          />
        </motion.div>
      </div>
    );
  }

  // Module Quiz after teach-back
  if (showQuiz && isLastLesson) {
    return (
      <div className="min-h-full p-4 md:p-8 max-w-4xl mx-auto">
        <button onClick={() => navigate('/')} className="text-text-secondary hover:text-white flex items-center gap-2 font-display uppercase tracking-widest text-sm mb-8 w-fit">
          <ArrowLeft className="w-4 h-4" />
          {t('common.back')}
        </button>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-6">
            <h1 className="text-3xl font-display font-bold text-white mb-2">{t('quiz.title')}</h1>
            <p className="text-text-secondary">{t('quiz.testKnowledge')}</p>
          </div>
          <ModuleQuiz 
            moduleId={parentModule.moduleId}
            onComplete={handleQuizComplete}
            isLocked={!quizUnlocked && !teachBackCompleted}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-full p-4 md:p-8 max-w-4xl mx-auto flex flex-col gap-6">
      
      {/* Header */}
      <button onClick={() => navigate('/')} className="text-text-secondary hover:text-white flex items-center gap-2 font-display uppercase tracking-widest text-sm mb-4 w-fit">
        <ArrowLeft className="w-4 h-4" />
        {t('common.backToMenu')}
      </button>

      <div className="flex items-center justify-between pb-6 border-b border-border-subtle">
        <div>
           <div className="text-primary font-display font-bold uppercase text-xs mb-2">
             {t('lesson.module')} {parentModule.moduleId} • {t('lesson.step')} {currentStep + 1}/{contentCount}
           </div>
           <h1 className="text-3xl font-display font-bold text-white">{lesson.title}</h1>
        </div>
        {isComplete && <div className="p-2 bg-primary/10 text-primary rounded-full"><CheckCircle2 className="w-6 h-6" /></div>}
      </div>

      {/* Lesson Content Area */}
      <div className="flex-1 my-6 text-lg font-body leading-relaxed space-y-8">
         
         <AnimatePresence mode="wait">
           <motion.div
             key={currentStep}
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -20 }}
           >
             {item.type === 'text' && (
               <div className="prose prose-invert max-w-none space-y-6">
                  {item.diagram && (
                    <div className="bg-surface-container border border-border-subtle rounded-xl p-6 flex justify-center">
                      <LessonDiagram type={item.diagram} />
                    </div>
                  )}
                  <p className="text-text-primary whitespace-pre-line">{item.body}</p>
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
                 {item.diagram && (
                   <div className="bg-surface border border-border-subtle rounded-xl p-4 flex justify-center">
                     <LessonDiagram type={item.diagram} />
                   </div>
                 )}
                 <h3 className="font-display font-bold text-xl text-white">{item.question}</h3>
                 
                 <div className="space-y-3">
                   {item.options.map((opt: string, idx: number) => {
                      let classes = "w-full text-left p-4 rounded-xl border font-display transition-colors ";
                      if (hasValidated) {
                        if (idx === item.correct) classes += "bg-primary/20 border-primary text-primary";
                        else if (idx === selectedOption) classes += "bg-error/20 border-error text-error";
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
                   <div className={`p-4 rounded-xl font-body ${selectedOption === item.correct ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error'}`}>
                      {selectedOption === item.correct ? t('lesson.correct') : t('lesson.incorrect')} {item.explanation}
                   </div>
                 )}
               </div>
             )}

             {item.type === 'step_solver' && sampleProblem && (
               <StepSolver problem={sampleProblem} />
             )}

             {item.type === 'error_analysis' && errorExercise && (
               <ErrorAnalysis exercise={{
                 id: errorExercise.id,
                 question: errorExercise.question,
                 steps: { en: ['Step 1: Read the problem', 'Step 2: Set up the equation', 'Step 3: Solve'], fr: ['Étape 1 : Lire le problème', 'Étape 2 : Mettre en équation', 'Étape 3 : Résoudre'] },
                 error: errorExercise.error,
                 explanation: errorExercise.explanation
               }} />
             )}
           </motion.div>
         </AnimatePresence>

      </div>

      {/* Footer Navigation */}
      <div className="pt-6 border-t border-border-subtle flex justify-between items-center">
         <div className="text-text-secondary text-sm">
           {isLastLesson && currentStep === contentCount - 1 && (
             <span className="flex items-center gap-2">
               <Trophy className="w-4 h-4 text-primary" />
               {t('lesson.finalLesson')}
             </span>
           )}
         </div>
         
         <div className="flex gap-3">
           {currentStep > 0 && (
             <button 
               onClick={() => {
                 setCurrentStep(prev => prev - 1);
                 setSelectedOption(null);
                 setHasValidated(false);
               }}
               className="px-6 py-3 border border-border-subtle text-white font-display font-bold rounded-xl hover:border-text-secondary transition-colors"
             >
               {t('common.back')}
             </button>
           )}
           
           {item.type === 'check' && !hasValidated ? (
             <button 
               onClick={handleValidate} 
               disabled={selectedOption === null}
               className="px-8 py-3 bg-primary text-surface font-display font-bold rounded-xl hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed"
             >
               {t('lesson.validate')}
             </button>
           ) : (
             <button 
               onClick={() => {
                 console.log('[Button] Clicked! type:', item?.type, 'step:', currentStep, 'isLastStep:', currentStep === contentCount - 1, 'isLastLesson:', isLastLesson);
                 handleNext();
               }} 
               className="px-8 py-3 bg-primary text-surface font-display font-bold rounded-xl hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed"
               disabled={item.type === 'check' && (!hasValidated || selectedOption !== item.correct)}
             >
               {currentStep < contentCount - 1 ? t('common.continue') : isLastLesson ? t('lesson.finishModule') : t('common.continue')}
             </button>
           )}
         </div>
      </div>

    </div>
  );
}
