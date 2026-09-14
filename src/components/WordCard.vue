<script setup lang="ts">
import type { Word } from "../lib/types";
import { useWordFormStore } from "../store/wordFormStore";

const props = defineProps<{ word: Word }>();

const emit = defineEmits<{ delete: [] }>();

const { setForm, openModal } = useWordFormStore();

const handleEdit = () => {
  setForm(props.word);
  openModal();
};
</script>

<template>
  <li
    class="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
  >
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0">
        <h2 class="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {{ word.name }}
        </h2>
        <span
          class="mt-1 inline-block rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-700 dark:bg-violet-950 dark:text-violet-300"
        >
          {{ word.type }}
        </span>
      </div>
      <div class="flex shrink-0">
        <button
          type="button"
          class="flex size-11 items-center justify-center rounded-lg text-violet-600 hover:bg-violet-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 dark:text-violet-400 dark:hover:bg-violet-950"
          aria-label="Edit"
          @click="handleEdit"
        >
          <svg
            class="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path
              d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"
            />
          </svg>
        </button>
        <button
          type="button"
          class="flex size-11 items-center justify-center rounded-lg text-red-600 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 dark:text-red-400 dark:hover:bg-red-950"
          aria-label="Delete"
          @click="emit('delete')"
        >
          <svg
            class="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
          </svg>
        </button>
      </div>
    </div>
    <p class="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
      {{ word.definition }}
    </p>
  </li>
</template>
