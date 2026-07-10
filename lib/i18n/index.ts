import { en, type Dictionary } from "./en";
import { vi } from "./vi";

export type Locale = "en" | "vi";
export const locales: Locale[] = ["en", "vi"];
export const defaultLocale: Locale = "en";

const dictionaries: Record<Locale, Dictionary> = { en, vi };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export type { Dictionary };
