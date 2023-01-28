import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './files/en.json';
import bn from './files/bn.json';
import gu from './files/gu.json';
import hi from './files/hi.json';
import kn from './files/kn.json';
import ml from './files/ml.json';
import or from './files/or.json';
import pa from './files/pa.json';
import ta from './files/ta.json';
import te from './files/te.json';
import ur from './files/ur.json';
import mr from './files/mr.json';

import { convertLanguageJsonToObject } from './translations';

export const translationsJson = {
  en: { translation: en },
  bn: { translation: bn },
  gu: { translation: gu },
  hi: { translation: hi },
  kn: { translation: kn },
  ml: { translation: ml },
  or: { translation: or },
  pa: { translation: pa },
  ta: { translation: ta },
  te: { translation: te },
  ur: { translation: ur },
  mr: { translation: mr },
};

// Create the 'translations' object to provide full intellisense support for the static json files.
convertLanguageJsonToObject(en);

export const i18n = i18next
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: translationsJson,
    fallbackLng: 'en',
    debug:
      process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });
