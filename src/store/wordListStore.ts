import { defineStore } from "pinia";
import type { Word } from "../lib/types";
import { loadWords, saveWords } from "../lib/wordStorage";

export const useWordListStore = defineStore("wordListStore", {
  state: () => ({ words: loadWords() }),
  getters: {
    getWords: (state) => state.words,
  },
  actions: {
    upsertWord(word: Word) {
      const existingWord = this.words.find((w) => w.id === word.id);
      if (existingWord) {
        Object.assign(existingWord, word);
      } else {
        this.words.push(word);
      }
      saveWords(this.words);
    },
    removeWord(id: string) {
      this.words = this.words.filter((word) => word.id !== id);
      saveWords(this.words);
    },
  },
});
