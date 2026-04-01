import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, HelpCircle, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';

interface StepSolverProps {
  problem: {
    id: string;
    question: { en: string; fr: string };
    diagram?: {
      angle?: number;
      opposite?: number;
      adjacent?: number;
      hypotenuse?: number;
    };
    solution: {
      ratio: 'sin' | 'cos' | 'tan' | 'sines' | 'cosines';
      setup: string;
      answer: number;
      tolerance: number;
    };
    hints: { en: string; fr: string }[];
  };
  onComplete?: (result: { correct: boolean; hintsUsed: number }) => void;
}

export default function StepSolver({ problem, onComplete }: StepSolverProps) {
  const { t, i18n } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [stepStatus, setStepStatus] = useState<Record<number, 'idle' | 'correct' | 'incorrect'>>({});
  const [showSolution, setShowSolution] = useState(false);

  const steps = [
    { id: 'diagram', title: t('solver.stepDiagram') },
    { id: 'label', title: t('solver.stepLabel') },
    { id: 'identify', title: t('solver.stepIdentify') },
    { id: 'choose', title: t('solver.stepChoose') },
    { id: 'setup', title: t('solver.stepSetup') },
    { id: 'solve', title: t('solver.stepSolve') },
    { id: 'interpret', title: t('solver.stepInterpret') },
  ];

  const handleAnswer = (stepIndex: number, answer: string) => {
    setAnswers({ ...answers, [stepIndex]: answer });
  };

  const checkAnswer = (stepIndex: number) => {
    const answer = answers[stepIndex];
    let isCorrect = false;

    switch (stepIndex) {
      case 3: // Choose ratio
        isCorrect = answer.toLowerCase().includes(problem.solution.ratio);
        break;
      case 4: // Setup equation
        isCorrect = answer.includes('=') || answer.toLowerCase().includes(problem.solution.ratio);
        break;
      case 5: // Solve
        const numAnswer = parseFloat(answer);
        isCorrect = Math.abs(numAnswer - problem.solution.answer) <= problem.solution.tolerance;
        break;
      default:
        isCorrect = answer.length > 0;
    }

    setStepStatus({ ...stepStatus, [stepIndex]: isCorrect ? 'correct' : 'incorrect' });
    
    if (isCorrect && stepIndex < steps.length - 1) {
      setTimeout(() => setCurrentStep(stepIndex + 1), 500);
    }

    if (isCorrect && stepIndex === steps.length - 1 && onComplete) {
      onComplete({ correct: true, hintsUsed });
    }
  };

  const useHint = () => {
    if (hintsUsed < problem.hints.length) {
      setHintsUsed(hintsUsed + 1);
      setShowHint(true);
    }
  };

  const revealSolution = () => {
    setShowSolution(true);
    setStepStatus(Object.fromEntries(steps.map((_, i) => [i, 'correct'])));
    if (onComplete) {
      onComplete({ correct: false, hintsUsed: hintsUsed + 3 });
    }
  };

  const lang = i18n.language as 'en' | 'fr';

  return (
    <div className="bg-surface-container border border-border-subtle rounded-2xl p-6 md:p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
            >
              <button
                onClick={() => setCurrentStep(index)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  index === currentStep
                    ? 'bg-primary text-surface'
                    : stepStatus[index] === 'correct'
                    ? 'bg-primary/30 text-primary'
                    : index < currentStep
                    ? 'bg-surface border border-primary text-primary'
                    : 'bg-surface border border-border-subtle text-text-secondary'
                }`}
              >
                {stepStatus[index] === 'correct' ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </button>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    stepStatus[index] === 'correct' ? 'bg-primary' : 'bg-border-subtle'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-text-secondary font-display">
          {steps[currentStep].title}
        </p>
      </div>

      {/* Question */}
      <div className="mb-6 p-4 bg-surface rounded-xl border border-border-subtle">
        <p className="text-text-primary">{problem.question[lang]}</p>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-4"
        >
          {currentStep === 0 && (
            <div className="space-y-4">
              <p className="text-text-secondary">
                {t('solver.drawDiagramPrompt')}
              </p>
              <div className="bg-surface p-6 rounded-xl border border-border-subtle flex items-center justify-center h-48">
                <TriangleDiagram diagram={problem.diagram} />
              </div>
              <button
                onClick={() => checkAnswer(0)}
                className="w-full bg-primary text-surface font-display font-bold py-3 rounded-xl hover:bg-primary-container transition-colors"
              >
                {t('solver.understood')}
              </button>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <p className="text-text-secondary">
                {t('solver.labelPrompt')}
              </p>
              <div className="grid grid-cols-3 gap-4">
                {['hypotenuse', 'opposite', 'adjacent'].map((side) => (
                  <button
                    key={side}
                    onClick={() => handleAnswer(1, side)}
                    className={`p-4 rounded-xl border-2 font-display transition-all ${
                      answers[1] === side
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border-subtle hover:border-primary/50'
                    }`}
                  >
                    {t(`triangle.${side}`)}
                  </button>
                ))}
              </div>
              <button
                onClick={() => checkAnswer(1)}
                disabled={!answers[1]}
                className="w-full bg-primary text-surface font-display font-bold py-3 rounded-xl disabled:opacity-50 hover:bg-primary-container transition-colors"
              >
                {t('common.continue')}
              </button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <p className="text-text-secondary">
                {t('solver.chooseRatioPrompt')}
              </p>
              <div className="grid grid-cols-3 gap-4">
                {['sin', 'cos', 'tan'].map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => handleAnswer(3, ratio)}
                    className={`p-4 rounded-xl border-2 font-math text-lg transition-all ${
                      answers[3] === ratio
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border-subtle hover:border-primary/50'
                    }`}
                  >
                    {ratio === 'sin' && 'sin(θ)'}
                    {ratio === 'cos' && 'cos(θ)'}
                    {ratio === 'tan' && 'tan(θ)'}
                  </button>
                ))}
              </div>
              <button
                onClick={() => checkAnswer(3)}
                disabled={!answers[3]}
                className="w-full bg-primary text-surface font-display font-bold py-3 rounded-xl disabled:opacity-50 hover:bg-primary-container transition-colors"
              >
                {t('common.continue')}
              </button>
            </div>
          )}

          {(currentStep === 4 || currentStep === 5) && (
            <div className="space-y-4">
              <p className="text-text-secondary">
                {currentStep === 4 ? t('solver.setupEquationPrompt') : t('solver.solvePrompt')}
              </p>
              <input
                type="text"
                value={answers[currentStep] || ''}
                onChange={(e) => handleAnswer(currentStep, e.target.value)}
                placeholder={currentStep === 4 ? "e.g., sin(30°) = x/10" : "Enter numerical answer"}
                className="w-full bg-surface border border-border-subtle rounded-xl px-4 py-3 text-white font-math focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
              {stepStatus[currentStep] === 'incorrect' && (
                <p className="text-error text-sm flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  {t('solver.notQuite')}
                </p>
              )}
              <button
                onClick={() => checkAnswer(currentStep)}
                disabled={!answers[currentStep]}
                className="w-full bg-primary text-surface font-display font-bold py-3 rounded-xl disabled:opacity-50 hover:bg-primary-container transition-colors"
              >
                {t('common.check')}
              </button>
            </div>
          )}

          {showSolution && (
            <div className="mt-4 p-4 bg-primary/10 rounded-xl border border-primary/30">
              <h4 className="font-display font-bold text-primary mb-2 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                {t('solver.solution')}
              </h4>
              <p className="font-math text-text-primary">{problem.solution.setup}</p>
              <p className="text-text-secondary mt-2">
                {t('solver.answer')}: <span className="font-math text-primary">{problem.solution.answer}</span>
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Hints & Navigation */}
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-border-subtle">
        <button
          onClick={useHint}
          disabled={hintsUsed >= problem.hints.length}
          className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors disabled:opacity-30"
        >
          <HelpCircle className="w-5 h-5" />
          <span className="text-sm">{t('solver.hintsLeft', { count: problem.hints.length - hintsUsed })}</span>
        </button>

        {stepStatus[currentStep] === 'incorrect' && (
          <button
            onClick={revealSolution}
            className="text-sm text-text-secondary hover:text-primary transition-colors"
          >
            {t('solver.showMeHow')}
          </button>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="p-2 rounded-lg hover:bg-surface disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1 || stepStatus[currentStep] !== 'correct'}
            className="p-2 rounded-lg hover:bg-surface disabled:opacity-30 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hint Display */}
      <AnimatePresence>
        {showHint && hintsUsed > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 p-4 bg-hint/10 rounded-xl border border-hint/30"
          >
            <p className="text-hint text-sm">
              <Lightbulb className="w-4 h-4 inline mr-2" />
              {problem.hints[hintsUsed - 1]?.[lang]}
            </p>
            <button
              onClick={() => setShowHint(false)}
              className="text-xs text-text-secondary mt-2 hover:text-hint"
            >
              {t('common.dismiss')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TriangleDiagram({ diagram }: { diagram?: { angle?: number; opposite?: number; adjacent?: number; hypotenuse?: number } }) {
  return (
    <svg viewBox="0 0 200 150" className="w-full h-full">
      {/* Triangle */}
      <polygon
        points="40,130 160,130 40,30"
        fill="none"
        stroke="#4DFFA4"
        strokeWidth="2"
      />
      {/* Right angle marker */}
      <rect x="40" y="115" width="15" height="15" fill="none" stroke="#4DFFA4" strokeWidth="1" />
      {/* Angle arc */}
      {diagram?.angle && (
        <path
          d="M 60 130 A 20 20 0 0 0 52 115"
          fill="none"
          stroke="#FFD166"
          strokeWidth="2"
        />
      )}
      {/* Labels */}
      <text x="20" y="80" fill="#F0F4FF" fontSize="12" fontFamily="JetBrains Mono">{diagram?.opposite || '?'}</text>
      <text x="100" y="145" fill="#F0F4FF" fontSize="12" fontFamily="JetBrains Mono">{diagram?.adjacent || '?'}</text>
      <text x="110" y="70" fill="#F0F4FF" fontSize="12" fontFamily="JetBrains Mono">{diagram?.hypotenuse || '?'}</text>
      {diagram?.angle && (
        <text x="65" y="125" fill="#FFD166" fontSize="10" fontFamily="JetBrains Mono">{diagram.angle}°</text>
      )}
    </svg>
  );
}
