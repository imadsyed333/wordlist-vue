<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useWordFormStore } from "../store/wordFormStore";
import { nextTick, ref, watch } from "vue";

const wordFormStore = useWordFormStore();

const { closeModal } = wordFormStore;

const { isOpen } = storeToRefs(wordFormStore);

const modalRef = ref<HTMLDialogElement | null>(null);

watch(isOpen, async (newVal) => {
  if (newVal) {
    await nextTick();
    modalRef.value?.showModal();
  } else {
    modalRef.value?.close();
  }
});

const handleDialogClick = (event: MouseEvent) => {
  if (event.target === modalRef.value) {
    closeModal();
  }
};
</script>

<template>
  <Teleport to="body">
    <Transition>
      <dialog
        v-show="isOpen"
        @cancel.prevent
        @click="handleDialogClick"
        ref="modalRef"
      >
        <div>
          <header>
            <slot name="header"></slot>
          </header>
          <main>
            <slot name="body"></slot>
          </main>
        </div>
      </dialog>
    </Transition>
  </Teleport>
</template>
