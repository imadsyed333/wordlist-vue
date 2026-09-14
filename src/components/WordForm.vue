<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useWordListStore } from "../store/wordListStore";
import { useWordFormStore } from "../store/wordFormStore";
import Modal from "./Modal.vue";

const wordListStore = useWordListStore();
const wordFormStore = useWordFormStore();

const { word } = storeToRefs(wordFormStore);

const { upsertWord } = wordListStore;
const { resetForm, closeModal } = wordFormStore;

const isEdit = computed(() =>
  wordListStore.words.some((w) => w.id === word.value.id),
);

const handleSubmit = () => {
  if (
    !word.value.name.trim() ||
    !word.value.type.trim() ||
    !word.value.definition.trim()
  )
    return;

  upsertWord(word.value);

  resetForm();
  closeModal();
};
</script>

<template>
  <Modal>
    <template v-slot:header>
      <h2 class="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        {{ isEdit ? "Edit Word" : "Add Word" }}
      </h2>
    </template>
    <template v-slot:body>
      <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
        <label class="flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Name
          <input
            v-model="word.name"
            class="min-h-11 rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-base font-normal text-zinc-900 placeholder:text-zinc-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-500"
            placeholder="Name of word"
          />
        </label>
        <label class="flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Type
          <input
            v-model="word.type"
            class="min-h-11 rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-base font-normal text-zinc-900 placeholder:text-zinc-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-500"
            placeholder="Type of word"
          />
        </label>
        <label class="flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Definition
          <input
            v-model="word.definition"
            class="min-h-11 rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-base font-normal text-zinc-900 placeholder:text-zinc-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-500"
            placeholder="Definition of word"
          />
        </label>
        <button
          type="submit"
          class="mt-1 min-h-12 rounded-xl bg-violet-600 text-base font-semibold text-white transition hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
        >
          {{ isEdit ? "Save Word" : "Add Word" }}
        </button>
      </form>
    </template>
  </Modal>
</template>
