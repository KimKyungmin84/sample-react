import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from 'i18next-http-backend';
import LocalStorageBackend from "i18next-localstorage-backend";
import ChainedBackend from "i18next-chained-backend";
import useThrowCustomError from "../components/error/hooks/useThrowCustomError";
import ServerErrorPage from '../components/error/components/ServerErrorPage';

i18next.use(initReactI18next).use(HttpBackend).init({
  lng: localStorage.getItem("lng") || "EN",
  fallbackLng: "EN", // fallback language
  backend: {
    loadPath: "http://localhost:10000/languageInfo/{{lng}}",
    parse: (data) => {
       return JSON.parse(data);
    },
    caching: false,
  },
});

// 여러 언어를 한 번에 로드
const supportedLanguages = ['EN', 'KO'];
supportedLanguages.forEach(lang => {
  i18next.loadLanguages(lang);
});


export default i18next;
