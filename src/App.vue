<script setup lang="ts">
import InstallBanner from "./components/InstallBanner.vue";
import WordForm from "./components/WordForm.vue";
import WordList from "./components/WordList.vue";
</script>

<template>
  <div
    class="relative mx-auto flex h-svh max-w-md flex-col overflow-hidden bg-zinc-50 dark:bg-zinc-950"
  >
    <InstallBanner />
    <WordList />
    <WordForm />
  </div>
</template>
