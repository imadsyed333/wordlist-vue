import type { Word } from "./types";

export const STORAGE_KEY = "wordlist:words";

export function isWord(value: unknown): value is Word {
  if (!value || typeof value !== "object") return false;
  const word = value as Record<string, unknown>;
  return (
    typeof word.id === "string" &&
    typeof word.name === "string" &&
    typeof word.type === "string" &&
    typeof word.definition === "string"
  );
}

export function parseWords(raw: string | null): Word[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isWord);
  } catch {
    return [];
  }
}

export function loadWords(): Word[] {
  try {
    return parseWords(localStorage.getItem(STORAGE_KEY));
  } catch {
    return [];
  }
}

export function saveWords(words: Word[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
  } catch {
    // quota exceeded or storage blocked (e.g. Safari private mode)
  }
}
