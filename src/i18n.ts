/* Import Dependencies */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

/* Import Language Source Files */
import EN from 'sources/languages/EN.json';
import NL from 'sources/languages/NL.json'


const resources = {
    EN: EN,
    NL: NL
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "EN",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;