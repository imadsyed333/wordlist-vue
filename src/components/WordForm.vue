<script setup lang="ts">
import { useWordListStore } from "../store/wordListStore";
import { useWordFormStore } from "../store/wordFormStore";
import { storeToRefs } from "pinia";
import Modal from "./Modal.vue";

const wordListStore = useWordListStore();
const wordFormStore = useWordFormStore();

const { word } = storeToRefs(wordFormStore);

const { upsertWord } = wordListStore;
const { resetForm, closeModal } = wordFormStore;

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
      <h2>Add Word</h2>
    </template>
    <template v-slot:body>
      <form @submit.prevent="handleSubmit">
        <input v-model="word.name" placeholder="Name of word" />
        <input v-model="word.type" placeholder="Type of word " />
        <input v-model="word.definition" placeholder="Definition of word" />
        <button type="submit">Add Word</button>
      </form>
    </template>
  </Modal>
</template>
