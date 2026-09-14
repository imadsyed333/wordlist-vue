<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useWordFormStore } from "../store/wordFormStore";
import { ref, watch } from "vue";

const wordFormStore = useWordFormStore();

const { closeModal } = wordFormStore;

const { isOpen } = storeToRefs(wordFormStore);

const modalRef = ref<HTMLDialogElement | null>(null);

watch(
  isOpen,
  (open) => {
    if (open) modalRef.value?.showModal();
  },
  { flush: "sync" },
);

const handleAfterLeave = () => {
  modalRef.value?.close();
};

const handleDialogClick = (event: MouseEvent) => {
  if (event.target === modalRef.value) {
    closeModal();
  }
};
</script>

<template>
  <Teleport to="body">
    <dialog
      class="fixed inset-0 m-0 h-full max-h-none w-full max-w-none border-0 bg-black/40 p-0 backdrop:bg-transparent open:flex open:flex-col"
      @cancel.prevent
      @click="handleDialogClick"
      ref="modalRef"
    >
      <Transition
        enter-from-class="translate-y-full"
        enter-active-class="transition-transform duration-200 ease-out"
        leave-active-class="transition-transform duration-200 ease-out"
        leave-to-class="translate-y-full"
        @after-leave="handleAfterLeave"
      >
        <div
          v-if="isOpen"
          class="mx-auto mt-auto w-full max-w-md rounded-t-3xl bg-white px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] dark:bg-zinc-900"
        >
          <header class="mb-4">
            <slot name="header"></slot>
          </header>
          <main>
            <slot name="body"></slot>
          </main>
        </div>
      </Transition>
    </dialog>
  </Teleport>
</template>
