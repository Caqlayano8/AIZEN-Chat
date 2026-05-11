"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Locale, TranslationKeys, translations, localeNames, localeFlags } from "./locales";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationKeys;
  dir: "ltr" | "rtl";
}

const I18nContext = createContext<I18nContextType>({
  locale: "tr",
  setLocale: () => {},
  t: translations.tr,
  dir: "ltr",
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("aizen-locale") as Locale) || "tr";
    }
    return "tr";
  });

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("aizen-locale", newLocale);
    }
  }, []);

  const t = translations[locale];
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

export { localeNames, localeFlags };
export type { Locale, TranslationKeys };
