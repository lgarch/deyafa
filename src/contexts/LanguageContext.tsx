import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr' | 'en' | 'ar';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations = {
  fr: {
    // Landing
    'landing.title': 'Dyafa',
    'landing.subtitle': 'Partagez un repas authentique avec des familles marocaines',
    'landing.tourist': 'Je suis Touriste',
    'landing.host': 'Je suis Hôte (Famille)',
    'landing.login': 'Se connecter / S\'inscrire',
    
    // Auth
    'auth.title': 'Connexion',
    'auth.email': 'Adresse email',
    'auth.sendOtp': 'Recevoir le code OTP',
    'auth.otp': 'Code OTP',
    'auth.verify': 'Vérifier',
    'auth.otpSent': 'Code OTP envoyé!',
    
    // Common
    'common.next': 'Continuer',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.confirm': 'Confirmer',
    'common.back': 'Retour',
    'common.price': 'Prix',
    'common.perPerson': 'par personne',
    'common.verified': 'Vérifié',
    
    // Host Onboarding
    'onboarding.title': 'Créer votre profil d\'hôte',
    'onboarding.familyName': 'Nom de la famille',
    'onboarding.city': 'Ville',
    'onboarding.languages': 'Langues parlées',
    'onboarding.description': 'Description',
    'onboarding.price': 'Prix par personne',
    'onboarding.photos': 'Photos du logement (3 max)',
    'onboarding.availability': 'Jours disponibles',
    
    // KYC
    'kyc.title': 'Vérification d\'identité',
    'kyc.idFront': 'Carte d\'identité (recto)',
    'kyc.idBack': 'Carte d\'identité (verso)',
    'kyc.selfie': 'Photo selfie',
    'kyc.status.notSent': 'Non envoyé',
    'kyc.status.pending': 'En attente',
    'kyc.status.verified': 'Vérifié',
    'kyc.finish': 'Terminer',
    
    // Search
    'search.title': 'Trouver une famille',
    'search.city': 'Ville',
    'search.date': 'Date',
    'search.filters': 'Filtres',
    'search.rating': 'Note',
    'search.noResults': 'Aucun résultat',
    
    // Host Profile
    'hostProfile.languages': 'Langues parlées',
    'hostProfile.availability': 'Disponibilités',
    'hostProfile.reviews': 'Avis',
    'hostProfile.book': 'Réserver ce repas',
    
    // Booking
    'booking.title': 'Réservation',
    'booking.date': 'Date',
    'booking.time': 'Heure',
    'booking.guests': 'Nombre de personnes',
    'booking.notes': 'Allergies / Notes',
    'booking.total': 'Total',
    'booking.confirm': 'Confirmer la réservation',
    'booking.success': 'Réservation confirmée!',
    
    // Dashboard
    'dashboard.myBookings': 'Mes réservations',
    'dashboard.status.pending': 'En attente',
    'dashboard.status.confirmed': 'Confirmée',
    'dashboard.cancelBooking': 'Annuler',
    'dashboard.viewDetails': 'Voir détails',
    
    // Host Dashboard
    'hostDashboard.title': 'Tableau de bord',
    'hostDashboard.profile': 'Mon profil',
    'hostDashboard.availability': 'Disponibilités',
    'hostDashboard.bookings': 'Réservations reçues',
    'hostDashboard.accept': 'Accepter',
    'hostDashboard.refuse': 'Refuser',
    
    // Settings
    'settings.title': 'Paramètres',
    'settings.profile': 'Profil',
    'settings.language': 'Langue',
    'settings.logout': 'Déconnexion',
  },
  en: {
    // Landing
    'landing.title': 'Dyafa',
    'landing.subtitle': 'Share an authentic meal with Moroccan families',
    'landing.tourist': 'I am a Tourist',
    'landing.host': 'I am a Host (Family)',
    'landing.login': 'Login / Sign up',
    
    // Auth
    'auth.title': 'Login',
    'auth.email': 'Email address',
    'auth.sendOtp': 'Send OTP code',
    'auth.otp': 'OTP Code',
    'auth.verify': 'Verify',
    'auth.otpSent': 'OTP code sent!',
    
    // Common
    'common.next': 'Continue',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.back': 'Back',
    'common.price': 'Price',
    'common.perPerson': 'per person',
    'common.verified': 'Verified',
    
    // Host Onboarding
    'onboarding.title': 'Create your host profile',
    'onboarding.familyName': 'Family name',
    'onboarding.city': 'City',
    'onboarding.languages': 'Languages spoken',
    'onboarding.description': 'Description',
    'onboarding.price': 'Price per person',
    'onboarding.photos': 'Home photos (3 max)',
    'onboarding.availability': 'Available days',
    
    // KYC
    'kyc.title': 'Identity Verification',
    'kyc.idFront': 'ID Card (front)',
    'kyc.idBack': 'ID Card (back)',
    'kyc.selfie': 'Selfie photo',
    'kyc.status.notSent': 'Not sent',
    'kyc.status.pending': 'Pending',
    'kyc.status.verified': 'Verified',
    'kyc.finish': 'Finish',
    
    // Search
    'search.title': 'Find a family',
    'search.city': 'City',
    'search.date': 'Date',
    'search.filters': 'Filters',
    'search.rating': 'Rating',
    'search.noResults': 'No results',
    
    // Host Profile
    'hostProfile.languages': 'Languages spoken',
    'hostProfile.availability': 'Availability',
    'hostProfile.reviews': 'Reviews',
    'hostProfile.book': 'Book this meal',
    
    // Booking
    'booking.title': 'Booking',
    'booking.date': 'Date',
    'booking.time': 'Time',
    'booking.guests': 'Number of guests',
    'booking.notes': 'Allergies / Notes',
    'booking.total': 'Total',
    'booking.confirm': 'Confirm booking',
    'booking.success': 'Booking confirmed!',
    
    // Dashboard
    'dashboard.myBookings': 'My bookings',
    'dashboard.status.pending': 'Pending',
    'dashboard.status.confirmed': 'Confirmed',
    'dashboard.cancelBooking': 'Cancel',
    'dashboard.viewDetails': 'View details',
    
    // Host Dashboard
    'hostDashboard.title': 'Dashboard',
    'hostDashboard.profile': 'My profile',
    'hostDashboard.availability': 'Availability',
    'hostDashboard.bookings': 'Received bookings',
    'hostDashboard.accept': 'Accept',
    'hostDashboard.refuse': 'Refuse',
    
    // Settings
    'settings.title': 'Settings',
    'settings.profile': 'Profile',
    'settings.language': 'Language',
    'settings.logout': 'Logout',
  },
  ar: {
    // Landing
    'landing.title': 'ضيافة',
    'landing.subtitle': 'شارك وجبة أصيلة مع عائلات مغربية',
    'landing.tourist': 'أنا سائح',
    'landing.host': 'أنا مضيف (عائلة)',
    'landing.login': 'تسجيل الدخول / التسجيل',
    
    // Auth
    'auth.title': 'تسجيل الدخول',
    'auth.email': 'عنوان البريد الإلكتروني',
    'auth.sendOtp': 'إرسال رمز OTP',
    'auth.otp': 'رمز OTP',
    'auth.verify': 'تحقق',
    'auth.otpSent': 'تم إرسال رمز OTP!',
    
    // Common
    'common.next': 'متابعة',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.confirm': 'تأكيد',
    'common.back': 'رجوع',
    'common.price': 'السعر',
    'common.perPerson': 'للشخص الواحد',
    'common.verified': 'موثق',
    
    // Host Onboarding
    'onboarding.title': 'إنشاء ملف تعريف المضيف',
    'onboarding.familyName': 'اسم العائلة',
    'onboarding.city': 'المدينة',
    'onboarding.languages': 'اللغات المنطوقة',
    'onboarding.description': 'الوصف',
    'onboarding.price': 'السعر للشخص الواحد',
    'onboarding.photos': 'صور المنزل (3 كحد أقصى)',
    'onboarding.availability': 'الأيام المتاحة',
    
    // KYC
    'kyc.title': 'التحقق من الهوية',
    'kyc.idFront': 'بطاقة الهوية (الأمامية)',
    'kyc.idBack': 'بطاقة الهوية (الخلفية)',
    'kyc.selfie': 'صورة سيلفي',
    'kyc.status.notSent': 'لم يتم الإرسال',
    'kyc.status.pending': 'قيد الانتظار',
    'kyc.status.verified': 'تم التحقق',
    'kyc.finish': 'إنهاء',
    
    // Search
    'search.title': 'البحث عن عائلة',
    'search.city': 'المدينة',
    'search.date': 'التاريخ',
    'search.filters': 'الفلاتر',
    'search.rating': 'التقييم',
    'search.noResults': 'لا توجد نتائج',
    
    // Host Profile
    'hostProfile.languages': 'اللغات المنطوقة',
    'hostProfile.availability': 'التوفر',
    'hostProfile.reviews': 'التقييمات',
    'hostProfile.book': 'احجز هذه الوجبة',
    
    // Booking
    'booking.title': 'الحجز',
    'booking.date': 'التاريخ',
    'booking.time': 'الوقت',
    'booking.guests': 'عدد الضيوف',
    'booking.notes': 'الحساسية / الملاحظات',
    'booking.total': 'المجموع',
    'booking.confirm': 'تأكيد الحجز',
    'booking.success': 'تم تأكيد الحجز!',
    
    // Dashboard
    'dashboard.myBookings': 'حجوزاتي',
    'dashboard.status.pending': 'قيد الانتظار',
    'dashboard.status.confirmed': 'مؤكد',
    'dashboard.cancelBooking': 'إلغاء',
    'dashboard.viewDetails': 'عرض التفاصيل',
    
    // Host Dashboard
    'hostDashboard.title': 'لوحة التحكم',
    'hostDashboard.profile': 'ملفي الشخصي',
    'hostDashboard.availability': 'التوفر',
    'hostDashboard.bookings': 'الحجوزات المستلمة',
    'hostDashboard.accept': 'قبول',
    'hostDashboard.refuse': 'رفض',
    
    // Settings
    'settings.title': 'الإعدادات',
    'settings.profile': 'الملف الشخصي',
    'settings.language': 'اللغة',
    'settings.logout': 'تسجيل الخروج',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('dyafa_language');
    return (saved as Language) || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('dyafa_language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['fr']] || key;
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
