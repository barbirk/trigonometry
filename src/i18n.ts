import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  fr: {
    translation: {
      "app": {
        "title": "TrigPath",
        "description": "Apprenez la trigonométrie sans frustration."
      },
      "dashboard": {
        "journeyMap": "Carte d'Apprentissage",
        "streak": "Série de jours",
        "mastery": "Matrice de Maîtrise",
        "review": "Révision Prioritaire"
      },
      "settings": {
        "title": "Paramètres",
        "language": "Langue",
        "theme": "Thème",
        "reset": "Réinitialiser la progression",
        "resetConfirm": "Êtes-vous sûr de vouloir supprimer votre progression ?"
      },
      "explorer": {
        "hypotenuse": "Hypoténuse",
        "opposite": "Opposé",
        "adjacent": "Adjacent",
        "mode345": "Mode 3-4-5"
      },
      "game": {
        "validate": "Valider",
        "hintsLeft": "Indices restants :",
        "correct": "C'est exact !",
        "incorrect": "Presque ! Indice :"
      }
    }
  },
  en: {
    translation: {
      "app": {
        "title": "TrigPath",
        "description": "Learn trigonometry without frustration."
      },
      "dashboard": {
        "journeyMap": "Journey Map",
        "streak": "Day Streak",
        "mastery": "Mastery Matrix",
        "review": "Priority Review"
      },
      "settings": {
        "title": "Settings",
        "language": "Language",
        "theme": "Theme",
        "reset": "Reset Progress",
        "resetConfirm": "Are you sure you want to delete your progress?"
      },
      "explorer": {
        "hypotenuse": "Hypotenuse",
        "opposite": "Opposite",
        "adjacent": "Adjacent",
        "mode345": "3-4-5 Mode"
      },
      "game": {
        "validate": "Submit",
        "hintsLeft": "Hints left:",
        "correct": "That's exactly right!",
        "incorrect": "Almost! Hint:"
      }
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "fr", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
