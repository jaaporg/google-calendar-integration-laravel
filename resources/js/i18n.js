import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./Public/Locales/en/translation.json";
import ja from "./Public/Locales/ja/translation.json";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: en,
            },
            ja: {
                translation: ja
            },
        },
        lng: "en",
        fallbackLng: "en",
    });

export default i18n;