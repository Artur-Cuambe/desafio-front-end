import { createI18n } from 'vue-i18n';
import en from './../locales/en.json';
import pt from './../locales/pt.json';

import countries_en from "./../locales/countries.en.json";
import countries_pt from "./../locales/countries.pt.json";

import nationalities_en from "./../locales/nationalities.en.json";
import nationalities_pt from "./../locales/nationalities.pt.json";


function loadLocaleMessages() {
  const messages = { en, pt };
  return messages;
}

const i18n = createI18n({
  legacy: false,
  locale: 'pt',
  fallbackLocale: 'en',
  messages: loadLocaleMessages(),
});

export default i18n;


const countriesTranslations = {
  legacy: false,
  fallbackLocale: "en",
  messages: {
    pt: countries_pt,
    en: countries_en,
  },
};


const nationalitiesTranslations  = {
  legacy: false,
  fallbackLocale: "en",
  messages: {
    en: nationalities_en,
    pt: nationalities_pt,
  },
};

export { countriesTranslations, nationalitiesTranslations };
