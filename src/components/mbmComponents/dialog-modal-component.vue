<template>
  <div>
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-[9999] overflow-y-auto " aria-labelledby="modal-title" role="dialog"
        aria-modal="true">
        <!-- Backdrop with blur - supports both themes -->
        <div class="fixed inset-0 bg-slate-900/70 dark:bg-slate-900/70 backdrop-blur-sm z-[9999]"></div>

        <div class="flex items-center justify-center min-h-screen p-4 text-center relative z-[10000]">
          <!-- Background overlay - supports both themes -->
          <div class="fixed inset-0 bg-slate-900/60 dark:bg-slate-900/75 transition-opacity" aria-hidden="true"
            @click="$emit('close')"></div>

          <!-- Centered modal panel - supports both themes -->
          <div
            class="inline-block align-middle w-full max-w-lg p-4 overflow-hidden text-left transition-all transform bg-white dark:bg-slate-800 rounded-lg shadow-xl relative z-[10001] border border-gray-200 dark:border-slate-700">
            <div class="relative">
              <!-- Modal content -->
              <div class="sm:flex sm:items-start">
                <div class="w-full mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white" id="modal-title">
                    <slot name="title">Modal Title</slot>
                  </h3>
                  <div class="mt-4 text-gray-700 dark:text-slate-300">
                    <slot name="body">Modal Content</slot>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="mt-6 sm:flex sm:flex-row-reverse" v-if="$slots.footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['close']);

// Close on escape key
const handleKeydown = (e) => {
  if (e.key === 'Escape' && props.show) {
    emit('close');
  }
};

watch(() => props.show, (value) => {
  if (value) {
    document.addEventListener('keydown', handleKeydown);
    document.body.style.overflow = 'hidden';
  } else {
    document.removeEventListener('keydown', handleKeydown);
    document.body.style.overflow = '';
  }
});
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Enhanced backdrop styling */
@supports (backdrop-filter: blur(4px)) {
  .backdrop-blur-sm {
    backdrop-filter: blur(1.5px);
  }
}

@supports not (backdrop-filter: blur(4px)) {
  .backdrop-blur-sm {
    @apply bg-slate-900/80 dark:bg-slate-900/80;
  }
}
</style>