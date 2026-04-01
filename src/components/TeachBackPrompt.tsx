import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, CheckCircle2, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';

interface TeachBackPromptProps {
  moduleId: number;
  concept: string;
  onComplete?: (result: { score: number; passed: boolean }) => void;
}

const prompts: Record<number, { en: { prompt: string; rubric: string }; fr: { prompt: string; rubric: string } }> = {
  0: {
    en: {
      prompt: "Explain to a friend who has never heard of trigonometry: Why do engineers care about triangles? Use a real-world example in your explanation.",
      rubric: "Must mention that triangles help calculate distances that cannot be measured directly, and give at least one example (GPS, building height, navigation, etc.)"
    },
    fr: {
      prompt: "Expliquez à un ami qui n'a jamais entendu parler de trigonométrie : Pourquoi les ingénieurs se soucient-ils des triangles ? Utilisez un exemple concret dans votre explication.",
      rubric: "Doit mentionner que les triangles aident à calculer des distances qui ne peuvent pas être mesurées directement, et donner au moins un exemple (GPS, hauteur d'immeuble, navigation, etc.)"
    }
  },
  1: {
    en: {
      prompt: "Explain what makes a right triangle special, and describe the three sides (hypotenuse, opposite, adjacent) as if teaching a classmate.",
      rubric: "Must: 1) Mention the 90° angle, 2) Define hypotenuse as longest side opposite right angle, 3) Explain opposite/adjacent relative to reference angle"
    },
    fr: {
      prompt: "Expliquez ce qui rend un triangle rectangle spécial, et décrivez les trois côtés (hypoténuse, opposé, adjacent) comme si vous enseigniez à un camarade.",
      rubric: "Doit : 1) Mentionner l'angle de 90°, 2) Définir l'hypoténuse comme le côté le plus long opposé à l'angle droit, 3) Expliquer opposé/adjacent par rapport à l'angle de référence"
    }
  },
  2: {
    en: {
      prompt: "Explain SOH-CAH-TOA to someone who has never heard of it. What do these ratios represent, and why are they useful?",
      rubric: "Must: 1) Define all three ratios correctly, 2) Explain that they connect angles to side lengths, 3) Mention that ratios are constant for a given angle regardless of triangle size"
    },
    fr: {
      prompt: "Expliquez SOH-CAH-TOA à quelqu'un qui n'en a jamais entendu parler. Que représentent ces ratios, et pourquoi sont-ils utiles ?",
      rubric: "Doit : 1) Définir correctement les trois ratios, 2) Expliquer qu'ils relient les angles aux longueurs des côtés, 3) Mentionner que les ratios sont constants pour un angle donné quelle que soit la taille du triangle"
    }
  },
  3: {
    en: {
      prompt: "Explain inverse trigonometric functions (sin⁻¹, cos⁻¹, tan⁻¹). When would you use them instead of the regular trig functions?",
      rubric: "Must: 1) Explain that inverse functions find angles from ratios, 2) Contrast with regular functions (ratios from angles), 3) Give an example scenario"
    },
    fr: {
      prompt: "Expliquez les fonctions trigonométriques inverses (sin⁻¹, cos⁻¹, tan⁻¹). Quand les utiliseriez-vous au lieu des fonctions trigonométriques normales ?",
      rubric: "Doit : 1) Expliquer que les fonctions inverses trouvent les angles à partir des ratios, 2) Contraster avec les fonctions normales (ratios à partir des angles), 3) Donner un exemple de scénario"
    }
  },
  4: {
    en: {
      prompt: "Describe the complete process for solving a real-world trigonometry problem, from reading the problem to interpreting the answer.",
      rubric: "Must include: 1) Drawing a diagram, 2) Labeling known/unknown values, 3) Choosing the right ratio, 4) Setting up equation, 5) Solving, 6) Interpreting in context"
    },
    fr: {
      prompt: "Décrivez le processus complet pour résoudre un problème de trigonométrie réel, de la lecture du problème à l'interprétation de la réponse.",
      rubric: "Doit inclure : 1) Dessiner un schéma, 2) Étiqueter les valeurs connues/inconnues, 3) Choisir le bon ratio, 4) Mettre en équation, 5) Résoudre, 6) Interpréter dans le contexte"
    }
  },
  5: {
    en: {
      prompt: "Explain when to use the Law of Sines versus the Law of Cosines. How do they extend what we learned about right triangles?",
      rubric: "Must: 1) State when to use each law (AAS/ASA/SSA vs SSS/SAS), 2) Explain that they work for ANY triangle, 3) Note that Law of Cosines becomes Pythagorean theorem at 90°"
    },
    fr: {
      prompt: "Expliquez quand utiliser la Loi des Sinus versus la Loi des Cosinus. Comment étendent-elles ce que nous avons appris sur les triangles rectangles ?",
      rubric: "Doit : 1) Indiquer quand utiliser chaque loi (AAS/ASA/SSA vs SSS/SAS), 2) Expliquer qu'elles fonctionnent pour TOUS les triangles, 3) Noter que la Loi des Cosinus devient le théorème de Pythagore à 90°"
    }
  }
};

// Mock AI scoring function (in real implementation, this would call Claude API)
async function mockScoreTeachBack(explanation: string, concept: string, rubric: string): Promise<{ score: number; feedback: string }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const wordCount = explanation.split(/\s+/).length;
  const hasKeyTerms = /\b(triangle|angle|side|ratio|sin|cos|tan|hypotenus|opposite|adjacent)\b/i.test(explanation);
  
  // Simple scoring logic for demo
  let score = 0;
  if (wordCount >= 50) score += 1;
  if (wordCount >= 80) score += 1;
  if (hasKeyTerms) score += 1;
  
  // Adjust based on content quality indicators
  if (explanation.includes('because') || explanation.includes('parce que')) score += 0.5;
  if (explanation.includes('example') || explanation.includes('exemple')) score += 0.5;
  
  score = Math.min(3, Math.floor(score));
  
  const feedbacks: Record<number, { en: string; fr: string }> = {
    0: {
      en: "Your explanation needs more detail. Try to include specific terminology and explain the 'why' behind the concepts.",
      fr: "Votre explication a besoin de plus de détails. Essayez d'inclure une terminologie spécifique et d'expliquer le 'pourquoi' derrière les concepts."
    },
    1: {
      en: "Good start! You've got some key ideas, but try to be more specific about how the concepts connect. Include an example if possible.",
      fr: "Bon début ! Vous avez quelques idées clés, mais essayez d'être plus spécifique sur la façon dont les concepts se connectent. Incluez un exemple si possible."
    },
    2: {
      en: "Well done! You explained the concept correctly with good detail. A small refinement would make this excellent—perhaps add a concrete example.",
      fr: "Bien joué ! Vous avez expliqué le concept correctement avec de bons détails. Une petite amélioration le rendrait excellent—ajoutez peut-être un exemple concret."
    },
    3: {
      en: "Excellent! Your explanation is clear, accurate, and demonstrates genuine understanding. You connected the concepts well—just like a teacher would!",
      fr: "Excellent ! Votre explication est claire, précise et démontre une véritable compréhension. Vous avez bien connecté les concepts—comme un enseignant le ferait !"
    }
  };
  
  return {
    score,
    feedback: feedbacks[score].en // Simplified for demo
  };
}

export default function TeachBackPrompt({ moduleId, onComplete }: TeachBackPromptProps) {
  const { t, i18n } = useTranslation();
  const [explanation, setExplanation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; feedback: string } | null>(null);
  const [canRetry, setCanRetry] = useState(true);

  const lang = i18n.language as 'en' | 'fr';
  const modulePrompt = prompts[moduleId] || prompts[0];
  const { prompt, rubric } = modulePrompt[lang];

  const handleSubmit = async () => {
    if (explanation.length < 50) return;
    
    setIsSubmitting(true);
    
    try {
      const scoring = await mockScoreTeachBack(explanation, `Module ${moduleId}`, rubric);
      setResult(scoring);
      
      if (onComplete) {
        onComplete({ 
          score: scoring.score, 
          passed: scoring.score >= 2 
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setResult(null);
    setCanRetry(false);
  };

  const wordCount = explanation.split(/\s+/).length;
  const minWords = 50;

  return (
    <div className="bg-surface-container border border-border-subtle rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-bold text-lg text-white">
            {t('teachBack.title')}
          </h3>
          <p className="text-text-secondary text-sm">
            {t('teachBack.subtitle')}
          </p>
        </div>
      </div>

      {!result ? (
        <div className="space-y-4">
          <div className="bg-surface p-4 rounded-xl border border-border-subtle">
            <p className="text-text-primary">{prompt}</p>
          </div>

          <div>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder={t('teachBack.placeholder')}
              rows={8}
              className="w-full bg-surface border border-border-subtle rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
            />
            <div className="flex items-center justify-between mt-2">
              <p className={`text-sm ${wordCount >= minWords ? 'text-primary' : 'text-text-secondary'}`}>
                {wordCount} {t('teachBack.words')}
              </p>
              {wordCount < minWords && (
                <p className="text-text-secondary text-xs">
                  {t('teachBack.minWords', { count: minWords })}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={wordCount < minWords || isSubmitting}
            className="w-full bg-primary text-surface font-display font-bold py-3 rounded-xl disabled:opacity-50 hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                {t('teachBack.scoring')}
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                {t('teachBack.submit')}
              </>
            )}
          </button>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Score Display */}
            <div
              className={`p-6 rounded-xl border ${
                result.score >= 2
                  ? 'bg-primary/10 border-primary/30'
                  : 'bg-hint/10 border-hint/30'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-display font-bold text-lg">
                  {result.score >= 2
                    ? t('teachBack.greatJob')
                    : t('teachBack.almostThere')}
                </h4>
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i < result.score ? 'bg-primary' : 'bg-border-subtle'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-text-primary">{result.feedback}</p>
            </div>

            {result.score < 2 && canRetry && (
              <button
                onClick={handleRetry}
                className="w-full border border-primary text-primary font-display font-bold py-3 rounded-xl hover:bg-primary/10 transition-colors"
              >
                {t('teachBack.tryAgain')}
              </button>
            )}

            {result.score >= 2 && (
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-display">
                  {t('teachBack.quizUnlocked')}
                </span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
