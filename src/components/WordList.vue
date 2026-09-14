<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useWordListStore } from "../store/wordListStore";
import WordCard from "./WordCard.vue";
import { useWordFormStore } from "../store/wordFormStore.ts";

const { getWords } = storeToRefs(useWordListStore());

const { openModal, resetForm } = useWordFormStore();

const handleAdd = () => {
  resetForm();
  openModal();
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
    <WordCard v-for="word in getWords" :key="word.id" :word="word" />
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
</template>
