import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import polish from './locales/pl.json';
import english from './locales/en.json';
import ukrainian from './locales/ua.json';

const resources = {
    en: {
        translation: english
    },
    pl: {
        translation: polish
    },
    ua: {
        translation: ukrainian
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "pl",

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;