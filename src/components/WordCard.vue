<script setup lang="ts">
import type { Word } from "../lib/types";
import { useWordFormStore } from "../store/wordFormStore";
import { useWordListStore } from "../store/wordListStore";

const props = defineProps<{ word: Word }>();

const { removeWord } = useWordListStore();

const { setForm, openModal } = useWordFormStore();

const handleDelete = () => {
  removeWord(props.word.id);
};

const handleEdit = () => {
  setForm(props.word);
  openModal();
};
</script>

<template>
  <div>
    <h2>{{ word.name }}</h2>
    <h6>{{ word.type }}</h6>
    <h3>{{ word.definition }}</h3>
    <button v-on:click="handleEdit">Edit</button>
    <button v-on:click="handleDelete">Delete</button>
  </div>
</template>
