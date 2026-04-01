import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      app: {
        title: "TrigPath",
        description: "Apprenez la trigonométrie sans frustration.",
        language: "Langue"
      },
      nav: {
        dashboard: "Tableau de Bord",
        review: "Révision",
        playground: "Playground",
        settings: "Paramètres"
      },
      dashboard: {
        journeyMap: "Carte d'Apprentissage",
        continueLearning: "Reprenez là où vous vous étiez arrêté.",
        streak: "Série",
        time: "Temps",
        modulesCompleted: "Modules Complétés",
        masteryRate: "Taux de Maîtrise",
        badges: "Badges",
        review: "Révision",
        reviewDescription: "L'algorithme de répétition espacée optimise la rétention à long terme.",
        reviewNow: "Réviser",
        allCaughtUp: "À Jour",
        completed: "Terminé",
        recentBadges: "Badges Récents",
        conceptMastery: "Maîtrise des Concepts",
        mastered: "Maîtrisé",
        learning: "En Apprentissage"
      },
      lesson: {
        notFound: "Leçon non trouvée.",
        module: "Module",
        step: "Étape",
        back: "Retour",
        backToMenu: "Retour au menu",
        validate: "Valider",
        correct: "C'est exact ! ",
        incorrect: "Presque ! ",
        finalLesson: "Dernière leçon du module",
        finishModule: "Terminer le Module"
      },
      triangle: {
        hypotenuse: "Hypoténuse",
        opposite: "Opposé",
        adjacent: "Adjacent"
      },
      solver: {
        stepDiagram: "Schéma",
        stepLabel: "Étiqueter",
        stepIdentify: "Identifier",
        stepChoose: "Choisir le Ratio",
        stepSetup: "Mettre en Équation",
        stepSolve: "Résoudre",
        stepInterpret: "Interpréter",
        drawDiagramPrompt: "Observez le diagramme ci-dessous. Identifiez l'angle de référence et les côtés connus.",
        understood: "J'ai compris",
        labelPrompt: "Cliquez sur chaque côté pour l'étiqueter comme Hypoténuse (H), Opposé (O) ou Adjacent (A).",
        chooseRatioPrompt: "Quel ratio trigonométrique devez-vous utiliser ?",
        setupEquationPrompt: "Mettez en équation avec le ratio choisi.",
        solvePrompt: "Calculez la valeur numérique.",
        notQuite: "Pas tout à fait. Essayez encore ou utilisez un indice.",
        solution: "Solution",
        answer: "Réponse",
        hintsLeft: "{{count}} indices restants",
        showMeHow: "Montrez-moi comment"
      },
      errorAnalysis: {
        title: "Analyse d'Erreur",
        subtitle: "Trouvez l'erreur dans ce raisonnement",
        selectStepPrompt: "Sélectionnez l'étape qui contient l'erreur :",
        explainError: "Expliquez l'erreur en une phrase :",
        explanationPlaceholder: "L'erreur est...",
        correctSpot: "Vous avez trouvé !",
        notQuite: "Ce n'est pas cette étape. Essayez encore.",
        theErrorWas: "L'erreur était :",
        shouldHaveBeen: "Ça aurait dû être :"
      },
      teachBack: {
        title: "Expliquez pour Comprendre",
        subtitle: "Enseigner est la meilleure façon d'apprendre",
        placeholder: "Expliquez le concept dans vos propres mots... (min. 50 mots)",
        words: "mots",
        minWords: "min. {{count}} mots",
        submit: "Soumettre pour Évaluation",
        scoring: "Évaluation en cours...",
        greatJob: "Excellent travail !",
        almostThere: "Presque !",
        tryAgain: "Réessayer",
        quizUnlocked: "Quiz débloqué !",
        moduleComplete: "Module Terminé",
        beforeQuiz: "Avant de passer au quiz, expliquez ce que vous avez appris.",
        passed: "Vous avez réussi !",
        revisionPrompt: "Relisez le module et essayez d'expliquer plus en détail."
      },
      review: {
        title: "Révision",
        subtitle: "Renforcez votre mémoire",
        howItWorks: "Comment ça marche",
        description: "Les cartes à réviser sont programmées par l'algorithme SM-2 pour optimiser votre rétention.",
        easyDesc: "Facile - La carte sera reprogrammée dans plusieurs jours",
        mediumDesc: "Moyen - La carte reviendra dans 1-2 jours",
        hardDesc: "Difficile - La carte reviendra demain",
        cardProgress: "Carte {{current}} sur {{total}}",
        question: "Question",
        answer: "Réponse",
        tapToFlip: "Appuyez pour retourner",
        flipToRate: "Retournez la carte pour évaluer",
        easy: "Facile",
        medium: "Moyen",
        hard: "Difficile",
        sessionComplete: "Session Terminée !",
        allCaughtUp: "Vous êtes à jour !"
      },
      quiz: {
        title: "Quiz du Module",
        locked: "Quiz Verrouillé",
        completeTeachBack: "Terminez l'exercice 'Expliquez pour Comprendre' pour débloquer le quiz.",
        noQuestions: "Pas de questions disponibles.",
        yourAnswer: "Votre réponse",
        enterAnswer: "Entrez votre réponse numérique",
        correct: "Correct !",
        incorrect: "Incorrect",
        correctAnswer: "La bonne réponse est :",
        solution: "Solution",
        scoreDisplay: "Vous avez obtenu {{score}}%",
        congratulations: "Félicitations !",
        keepTrying: "Continuez à essayer !",
        retry: "Réessayer",
        moduleComplete: "Module Complété !",
        testKnowledge: "Testez vos connaissances avec ce quiz de 10 questions."
      },
      warmUp: {
        title: "Échauffement du Jour",
        loading: "Chargement...",
        iKnowThis: "Je sais ça",
        needPractice: "J'ai besoin de pratique",
        correct: "Correct !",
        review: "À réviser",
        next: "Suivant",
        finish: "Terminer",
        skip: "Passer l'échauffement",
        perfect: "Parfait !",
        goodJob: "Bon travail !",
        score: "{{correct}}/{{total}} correct",
        continue: "Continuer"
      },
      settings: {
        title: "Paramètres",
        subtitle: "Personnalisez votre expérience",
        language: "Langue",
        languageDesc: "Choisissez votre langue préférée",
        calculatorGuard: "Vérification Calculatrice",
        calculatorGuardDesc: "Vérifiez que votre calculatrice est en mode degrés",
        notifications: "Notifications",
        notificationsDesc: "Recevez des rappels de révision",
        darkMode: "Mode Sombre",
        comingSoon: "Bientôt disponible",
        alwaysOn: "Toujours actif",
        resetProgress: "Réinitialiser la Progression",
        resetProgressDesc: "Supprime toutes vos données de progression",
        reset: "Réinitialiser",
        confirmReset: "Confirmer la Réinitialisation",
        resetWarning: "Cette action est irréversible. Toute votre progression sera perdue."
      },
      common: {
        back: "Retour",
        continue: "Continuer",
        next: "Suivant",
        check: "Vérifier",
        done: "Terminé",
        cancel: "Annuler",
        dismiss: "Masquer"
      }
    }
  },
  en: {
    translation: {
      app: {
        title: "TrigPath",
        description: "Learn trigonometry without frustration.",
        language: "Language"
      },
      nav: {
        dashboard: "Dashboard",
        review: "Review",
        playground: "Playground",
        settings: "Settings"
      },
      dashboard: {
        journeyMap: "Journey Map",
        continueLearning: "Continue where you left off.",
        streak: "Streak",
        time: "Time",
        modulesCompleted: "Modules Completed",
        masteryRate: "Mastery Rate",
        badges: "Badges",
        review: "Review",
        reviewDescription: "Spaced repetition algorithm optimizes long-term retention.",
        reviewNow: "Review Now",
        allCaughtUp: "All Caught Up",
        completed: "Completed",
        recentBadges: "Recent Badges",
        conceptMastery: "Concept Mastery",
        mastered: "Mastered",
        learning: "Learning"
      },
      lesson: {
        notFound: "Lesson not found.",
        module: "Module",
        step: "Step",
        back: "Back",
        backToMenu: "Back to menu",
        validate: "Validate",
        correct: "That's exactly right! ",
        incorrect: "Almost! ",
        finalLesson: "Final lesson of module",
        finishModule: "Finish Module"
      },
      triangle: {
        hypotenuse: "Hypotenuse",
        opposite: "Opposite",
        adjacent: "Adjacent"
      },
      solver: {
        stepDiagram: "Diagram",
        stepLabel: "Label",
        stepIdentify: "Identify",
        stepChoose: "Choose Ratio",
        stepSetup: "Set Up Equation",
        stepSolve: "Solve",
        stepInterpret: "Interpret",
        drawDiagramPrompt: "Look at the diagram below. Identify the reference angle and known sides.",
        understood: "I understand",
        labelPrompt: "Click on each side to label it as Hypotenuse (H), Opposite (O), or Adjacent (A).",
        chooseRatioPrompt: "Which trigonometric ratio should you use?",
        setupEquationPrompt: "Set up the equation with your chosen ratio.",
        solvePrompt: "Calculate the numerical value.",
        notQuite: "Not quite. Try again or use a hint.",
        solution: "Solution",
        answer: "Answer",
        hintsLeft: "{{count}} hints left",
        showMeHow: "Show me how"
      },
      errorAnalysis: {
        title: "Error Analysis",
        subtitle: "Spot the mistake in this reasoning",
        selectStepPrompt: "Select the step that contains the error:",
        explainError: "Explain the error in one sentence:",
        explanationPlaceholder: "The error is...",
        correctSpot: "You found it!",
        notQuite: "That's not the step with the error. Try again.",
        theErrorWas: "The error was:",
        shouldHaveBeen: "It should have been:"
      },
      teachBack: {
        title: "Teach to Learn",
        subtitle: "Teaching is the best way to learn",
        placeholder: "Explain the concept in your own words... (min. 50 words)",
        words: "words",
        minWords: "min. {{count}} words",
        submit: "Submit for Evaluation",
        scoring: "Evaluating...",
        greatJob: "Great job!",
        almostThere: "Almost there!",
        tryAgain: "Try Again",
        quizUnlocked: "Quiz unlocked!",
        moduleComplete: "Module Complete",
        beforeQuiz: "Before taking the quiz, explain what you've learned.",
        passed: "You passed!",
        revisionPrompt: "Review the module and try to explain in more detail."
      },
      review: {
        title: "Review",
        subtitle: "Strengthen your memory",
        howItWorks: "How it works",
        description: "Cards are scheduled by the SM-2 algorithm to optimize your retention.",
        easyDesc: "Easy - Card will be rescheduled in several days",
        mediumDesc: "Medium - Card will return in 1-2 days",
        hardDesc: "Hard - Card will return tomorrow",
        cardProgress: "Card {{current}} of {{total}}",
        question: "Question",
        answer: "Answer",
        tapToFlip: "Tap to flip",
        flipToRate: "Flip the card to rate",
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
        sessionComplete: "Session Complete!",
        allCaughtUp: "You're all caught up!"
      },
      quiz: {
        title: "Module Quiz",
        locked: "Quiz Locked",
        completeTeachBack: "Complete the 'Teach to Learn' exercise to unlock the quiz.",
        noQuestions: "No questions available.",
        yourAnswer: "Your answer",
        enterAnswer: "Enter your numerical answer",
        correct: "Correct!",
        incorrect: "Incorrect",
        correctAnswer: "The correct answer is:",
        solution: "Solution",
        scoreDisplay: "You scored {{score}}%",
        congratulations: "Congratulations!",
        keepTrying: "Keep trying!",
        retry: "Retry",
        moduleComplete: "Module Complete!",
        testKnowledge: "Test your knowledge with this 10-question quiz."
      },
      warmUp: {
        title: "Daily Warm-Up",
        loading: "Loading...",
        iKnowThis: "I know this",
        needPractice: "Need practice",
        correct: "Correct!",
        review: "Review needed",
        next: "Next",
        finish: "Finish",
        skip: "Skip warm-up",
        perfect: "Perfect!",
        goodJob: "Good job!",
        score: "{{correct}}/{{total}} correct",
        continue: "Continue"
      },
      settings: {
        title: "Settings",
        subtitle: "Customize your experience",
        language: "Language",
        languageDesc: "Choose your preferred language",
        calculatorGuard: "Calculator Check",
        calculatorGuardDesc: "Verify your calculator is in degree mode",
        notifications: "Notifications",
        notificationsDesc: "Get review reminders",
        darkMode: "Dark Mode",
        comingSoon: "Coming soon",
        alwaysOn: "Always on",
        resetProgress: "Reset Progress",
        resetProgressDesc: "Delete all your progress data",
        reset: "Reset",
        confirmReset: "Confirm Reset",
        resetWarning: "This action cannot be undone. All your progress will be lost."
      },
      common: {
        back: "Back",
        continue: "Continue",
        next: "Next",
        check: "Check",
        done: "Done",
        cancel: "Cancel",
        dismiss: "Dismiss"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "fr",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
