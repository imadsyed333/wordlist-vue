import { defineStore } from "pinia";
import type { Word } from "../lib/types";

export const useWordListStore = defineStore("wordListStore", {
  state: () => ({ words: [] as Word[] }),
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
    },
    removeWord(id: string) {
      this.words = this.words.filter((word) => word.id !== id);
    },
  },
});
