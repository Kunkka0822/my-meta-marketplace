import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';

const resources = {
    en: {
        translation: en,
    },
};
i18n.use(initReactI18next).init({
    resources,
    lng: process.env.REACT_APP_LOCALE,
    interpolation: {
        escapeValue: false,
    },
});
export default i18n;
