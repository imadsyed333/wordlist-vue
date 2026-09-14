<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import type { Word } from "../lib/types";
import { useWordListStore } from "../store/wordListStore";
import WordCard from "./WordCard.vue";
import Modal from "./Modal.vue";
import { useWordFormStore } from "../store/wordFormStore.ts";

const wordListStore = useWordListStore();
const { getWords } = storeToRefs(wordListStore);
const { removeWord } = wordListStore;

const { openModal, resetForm } = useWordFormStore();

const confirmOpen = ref(false);
const pendingDelete = ref<Word | null>(null);

const handleAdd = () => {
  resetForm();
  openModal();
};

const requestDelete = (word: Word) => {
  pendingDelete.value = word;
  confirmOpen.value = true;
};

const closeConfirm = () => {
  confirmOpen.value = false;
};

const confirmDelete = () => {
  if (pendingDelete.value) removeWord(pendingDelete.value.id);
  confirmOpen.value = false;
};
</script>

<template>
  <header
    class="shrink-0 border-b border-zinc-200/80 bg-zinc-50 px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-3 dark:border-zinc-800 dark:bg-zinc-950"
  >
    <h1 class="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
      WordList
    </h1>
  </header>

  <ul
    v-if="getWords.length > 0"
    class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4 pb-[calc(6rem+env(safe-area-inset-bottom))]"
  >
    <WordCard
      v-for="word in getWords"
      :key="word.id"
      :word="word"
      @delete="requestDelete(word)"
    />
  </ul>

  <p
    v-else
    class="flex min-h-0 flex-1 items-center justify-center px-6 pb-[calc(6rem+env(safe-area-inset-bottom))] text-center text-zinc-500 dark:text-zinc-400"
  >
    No words yet
  </p>

  <button
    type="button"
    class="absolute right-5 bottom-[max(1.25rem,env(safe-area-inset-bottom))] flex size-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
    aria-label="Add Word"
    @click="handleAdd"
  >
    <svg
      class="size-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  </button>

  <Modal :open="confirmOpen" @close="closeConfirm">
    <template #header>
      <h2 class="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Delete word?
      </h2>
    </template>
    <template #body>
      <p class="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        Delete “{{ pendingDelete?.name }}”? This cannot be undone.
      </p>
      <div class="mt-4 flex gap-3">
        <button
          type="button"
          class="min-h-12 flex-1 rounded-xl border border-zinc-200 bg-white text-base font-semibold text-zinc-700 transition hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
          @click="closeConfirm"
        >
          Cancel
        </button>
        <button
          type="button"
          class="min-h-12 flex-1 rounded-xl bg-red-600 text-base font-semibold text-white transition hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          @click="confirmDelete"
        >
          Delete
        </button>
      </div>
    </template>
  </Modal>
</template>
