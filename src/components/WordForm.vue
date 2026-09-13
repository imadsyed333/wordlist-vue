<script setup lang="ts">
import { useWordListStore } from "../store/wordListStore";
import { useWordFormStore } from "../store/wordFormStore";
import { storeToRefs } from "pinia";

const wordListStore = useWordListStore();
const wordFormStore = useWordFormStore();

const { word } = storeToRefs(wordFormStore);

const { addWord } = wordListStore;
const { resetForm } = wordFormStore;

const handleAdd = () => {
  if (
    !word.value.name.trim() ||
    !word.value.type.trim() ||
    !word.value.definition.trim()
  )
    return;

  addWord(word.value);

  resetForm();
};
</script>

<template>
  <div>
    <h2>Add Word</h2>
    <form @submit.prevent="handleAdd">
      <input v-model="word.name" placeholder="Name of word" />
      <input v-model="word.type" placeholder="Type of word " />
      <input v-model="word.definition" placeholder="Definition of word" />
      <button type="submit">Add Word</button>
    </form>
  </div>
</template>
