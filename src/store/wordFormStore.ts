import { defineStore } from "pinia";
import type { Word } from "../lib/types";
import { nanoid } from "nanoid";

export const useWordFormStore = defineStore("wordFormStore", {
  state: () => ({
    word: {
      id: nanoid(10),
      name: "",
      type: "",
      definition: "",
    } as Word,
    isOpen: false,
  }),
  actions: {
    setForm(word: Word) {
      this.word = { ...word };
    },
    resetForm() {
      this.word = {
        id: nanoid(10),
        name: "",
        type: "",
        definition: "",
      };
    },
    closeModal() {
      this.isOpen = false;
    },
    openModal() {
      this.isOpen = true;
    },
  },
});
