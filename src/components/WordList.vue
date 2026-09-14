<script setup lang="ts">
import { useWordListStore } from "../store/wordListStore";
import WordCard from "./WordCard.vue";
import { useWordFormStore } from "../store/wordFormStore.ts";

const { getWords } = useWordListStore();

const { openModal } = useWordFormStore();

const handleAdd = () => {
  openModal();
};
</script>

<template>
  <h1>WordList</h1>
  <ul v-if="getWords.length > 0">
    <WordCard v-for="word in getWords" :word="word" />
  </ul>
  <button @click="handleAdd">Add Word</button>
</template>
