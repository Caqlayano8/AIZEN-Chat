"use client";
import { useState, useRef, useEffect } from "react";
import { FiGlobe, FiCheck } from "react-icons/fi";
import { useI18n, localeNames, localeFlags, type Locale } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const locales: Locale[] = ["tr", "en", "de", "fr", "ar", "es"];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition text-sm"
      >
        <FiGlobe size={16} />
        <span>{localeFlags[locale]} {localeNames[locale]}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-[#1e1e2e] border border-gray-700 rounded-xl shadow-xl z-50 py-1 overflow-hidden">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => { setLocale(loc); setIsOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition hover:bg-gray-800 ${
                locale === loc ? "text-purple-400 bg-purple-500/5" : "text-gray-300"
              }`}
            >
              <span className="text-lg">{localeFlags[loc]}</span>
              <span className="flex-1 text-left">{localeNames[loc]}</span>
              {locale === loc && <FiCheck size={14} className="text-purple-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
