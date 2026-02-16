import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          // General
          "appTitle": "Intelligent Tax Filing",
          "appSubtitle": "Smart analysis of gross and net earnings.",
          "title": "Intelligent Tax Filing",
          "description": "A sophisticated web application providing intelligent tax filing assistance using Artificial Intelligence.",

          // Form
          "formTitle": "Calculation Details",
          "formDesc": "Enter your monthly or annual salary for analysis.",
          "grossSalaryLabel": "Monthly Gross (€)",
          "annualGrossLabel": "Annual Gross (€)",
          "sectorLabel": "Sector of Employment",
          "privateSector": "Private",
          "publicSector": "Public",
          "marriedLabel": "Married",
          "marriedDesc": "Affects the tax-free limit",
          "taxFreeLimit": "Current Tax-Free",
          "childrenLabel": "Number of Children",
          "analyzeButton": "Calculate & Analysis",
          "loadingText": "Processing...",

          // Results Section
          "resultsTitle": "Analysis Results",
          "annualGross": "Annual Gross",
          "annualNet": "Annual Net",
          "annualTax": "Annual Tax",
          "monthlyNet": "Monthly Net",
          "aiTitle": "Intelligent Advice",
          "aiDefault": "Analysis complete. Consult your accountant for details.",

          // Notifications & Errors
          "successCalculation": "Calculation complete!",
          "errorSalary": "Please enter a valid salary.",
          "errorConnection": "Failed to connect to the backend server.",
          "errorNegative": "Amounts cannot be negative!",
          "errorZero": "Please enter a valid income."
        }
      },
      el: {
        translation: {
          // Γενικά
          "appTitle": "Έξυπνη Φορολογική Ανάλυση",
          "appSubtitle": "Έξυπνη ανάλυση μεικτών και καθαρών αποδοχών.",
          "title": "Έξυπνος Βοηθός Φορολογίας",
          "description": "Μια εξελιγμένη εφαρμογή που χρησιμοποιεί τεχνητή νοημοσύνη για να σας παρέχει έξυπνη φορολογική βοήθεια.",

          // Φόρμα
          "formTitle": "Στοιχεία Υπολογισμού",
          "formDesc": "Εισάγετε τον μηνιαίο ή ετήσιο μισθό σας για ανάλυση.",
          "grossSalaryLabel": "Μηνιαία Μεικτά (€)",
          "annualGrossLabel": "Ετήσια Μεικτά (€)",
          "sectorLabel": "Τομέας Απασχόλησης",
          "privateSector": "Ιδιωτικός",
          "publicSector": "Δημόσιος",
          "marriedLabel": "Έγγαμος/η",
          "marriedDesc": "Επηρεάζει το αφορολόγητο όριο",
          "taxFreeLimit": "Τρέχον Αφορολόγητο",
          "childrenLabel": "Αριθμός Παιδιών",
          "analyzeButton": "Υπολογισμός & Ανάλυση",
          "loadingText": "Επεξεργασία...",

          // Ενότητα Αποτελεσμάτων
          "resultsTitle": "Αποτελέσματα Ανάλυσης",
          "annualGross": "Μεικτά Ετήσια",
          "annualNet": "Καθαρά Ετήσια",
          "annualTax": "Ετήσιος Φόρος",
          "monthlyNet": "Μηνιαία Καθαρά",
          "aiTitle": "Intelligent Advice",
          "aiDefault": "Η ανάλυση ολοκληρώθηκε. Συμβουλευτείτε το λογιστή σας για λεπτομέρειες.",

          // Ειδοποιήσεις & Σφάλματα
          "successCalculation": "Ο υπολογισμός ολοκληρώθηκε!",
          "errorSalary": "Παρακαλώ εισάγετε ένα έγκυρο ποσό.",
          "errorConnection": "Αποτυχία σύνδεσης με το διακομιστή (Backend).",
          "errorNegative": "Τα ποσά δεν μπορεί να είναι αρνητικά!",
          "errorZero": "Παρακαλώ εισάγετε ένα έγκυρο εισόδημα."
        }
      }
    },
    fallbackLng: 'el',
    debug: true,
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;