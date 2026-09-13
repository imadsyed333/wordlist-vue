<script setup lang="ts">
import { useWordListStore } from "../store/wordListStore";

const store = useWordListStore();
</script>

<template>
  <h1>WordList</h1>
  <ul v-if="store.words.length > 0">
    <li v-for="word in store.words">
      <span>{{ word.name }}</span>
    </li>
  </ul>
</template>
