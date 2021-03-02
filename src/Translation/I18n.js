import i18n from 'i18next';
import {useTranslation, initReactI18next} from 'react-i18next';

const resources = {
  en: {
    translation: {
      Home: 'Home',
    },
  },
  ar: {
    translation: {
      Home: 'الرئيسيه',
      Search:'بحث',
      Settings: 'الاعدادات',
      'Edit Account & profile': 'تعديل المعلومات الشخصيه & الصفحه الشخصيه',

    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });
i18n.changeLanguage('ar');
export default i18n;
