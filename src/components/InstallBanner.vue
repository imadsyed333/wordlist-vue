<script setup lang="ts">
import { onUnmounted, ref } from "vue";
import { isStandalonePwa } from "../lib/displayMode";

const DISMISS_KEY = "wordlist:install-banner";

const isIos =
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

const readDismissed = () => {
  try {
    return localStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
};

const visible = ref(!isStandalonePwa() && !readDismissed());
const installPrompt = ref<{ prompt: () => Promise<void> } | null>(null);

const hide = () => {
  visible.value = false;
  try {
    localStorage.setItem(DISMISS_KEY, "1");
  } catch {
    // quota exceeded or storage blocked (e.g. Safari private mode)
  }
};

const onBeforeInstall = (e: Event) => {
  e.preventDefault();
  installPrompt.value = e as Event & { prompt: () => Promise<void> };
};

const standaloneMq = matchMedia("(display-mode: standalone)");
const onStandalone = (e: MediaQueryListEvent) => {
  if (e.matches) visible.value = false;
};

if (visible.value) {
  addEventListener("beforeinstallprompt", onBeforeInstall);
  addEventListener("appinstalled", hide);
  standaloneMq.addEventListener("change", onStandalone);
}

onUnmounted(() => {
  removeEventListener("beforeinstallprompt", onBeforeInstall);
  removeEventListener("appinstalled", hide);
  standaloneMq.removeEventListener("change", onStandalone);
});

const addToHomeScreen = () => {
  void installPrompt.value?.prompt();
  installPrompt.value = null;
};
</script>

<template>
  <div
    v-if="visible"
    class="flex shrink-0 items-start gap-3 border-b border-violet-200 bg-violet-50 px-4 py-3 dark:border-violet-900 dark:bg-violet-950"
    role="status"
  >
    <div class="min-w-0 flex-1">
      <p class="text-sm font-medium text-violet-950 dark:text-violet-50">
        Add WordList to your home screen
      </p>
      <p
        v-if="isIos || !installPrompt"
        class="mt-0.5 text-sm text-violet-800 dark:text-violet-200"
      >
        {{
          isIos
            ? "Tap Share, then Add to Home Screen."
            : "Open the browser menu and choose Install app or Add to Home Screen."
        }}
      </p>
      <button
        v-if="installPrompt"
        type="button"
        class="mt-2 min-h-11 rounded-xl bg-violet-600 px-3 text-sm font-semibold text-white transition hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
        @click="addToHomeScreen"
      >
        Add to Home Screen
      </button>
    </div>
    <button
      type="button"
      class="flex size-11 shrink-0 items-center justify-center rounded-lg text-violet-700 hover:bg-violet-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 dark:text-violet-300 dark:hover:bg-violet-900"
      aria-label="Dismiss"
      @click="hide"
    >
      <svg
        class="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        aria-hidden="true"
      >
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>
  </div>
</template>
