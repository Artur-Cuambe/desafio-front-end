// src/i18n.js
import { createI18n } from 'vue-i18n';
import axios from 'axios';

const i18n = createI18n({
  legacy: false,
  locale: 'pt', // Idioma padrão
  fallbackLocale: 'en',
  messages: {}  // Inicialmente vazio
});

async function loadLocaleMessages(locale) {
  try {
    const response = await axios.get(`http://localhost:3006/translations/all/${locale}`);
    const messages = response.data;
    i18n.global.setLocaleMessage(locale, messages);
  } catch (error) {
    console.error(`Failed to load translations for locale: ${locale}`, error);
  }
}

async function setupI18n(locale) {
  if (!i18n.global.availableLocales.includes(locale)) {
    await loadLocaleMessages(locale);
  }
  console.log('====================================');
  console.log(locale);
  console.log('====================================');
  i18n.global.locale.value = locale;
}

export { i18n, setupI18n };
