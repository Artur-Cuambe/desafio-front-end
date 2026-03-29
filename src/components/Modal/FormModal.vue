<template>
  <TransitionRoot :show="isOpen" as="template">
    <Dialog as="div" @close="handleClose" class="relative z-[99999]">
      <TransitionChild
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-300 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-slate-900/50 backdrop-filter backdrop-blur-sm"
        />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full justify-center text-center p-6 items-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full transform overflow-hidden rounded-md bg-white dark:bg-slate-800 text-left align-middle shadow-xl transition-all"
              :class="sizeClass"
            >
              <div
                class="relative overflow-hidden py-4 px-5 text-white flex justify-between items-center"
                :class="themeClass"
              >
                <h2
                  class="capitalize leading-6 tracking-wider font-medium text-base text-white"
                >
                  {{ title }}
                </h2>
                <button
                  @click="handleClose"
                  class="text-[22px] hover:opacity-80 transition-opacity"
                  type="button"
                >
                  <Icon icon="heroicons-outline:x" />
                </button>
              </div>

              <div class="px-6 py-8" :class="scrollContent ? 'overflow-y-auto max-h-[500px]' : ''">
                <slot />
              </div>

              <div
                v-if="showFooter"
                class="px-6 py-4 flex justify-end space-x-3 border-t border-slate-100 dark:border-slate-700"
              >
                <slot name="footer">
                  <button
                    @click="handleClose"
                    type="button"
                    class="btn bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600"
                    :disabled="loading"
                  >
                    Cancel
                  </button>
                  <button
                    @click="handleSubmit"
                    type="button"
                    class="btn bg-primary-500 text-white hover:bg-primary-600"
                    :disabled="loading"
                  >
                    <span v-if="!loading">{{ submitText }}</span>
                    <span v-else class="flex items-center">
                      <svg
                        class="animate-spin -ml-1 mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  </button>
                </slot>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import Icon from '@/components/Icon'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel
} from '@headlessui/vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Modal'
  },
  themeClass: {
    type: String,
    default: 'bg-slate-900 dark:bg-slate-800 dark:border-b dark:border-slate-700'
  },
  sizeClass: {
    type: String,
    default: 'max-w-xl'
  },
  scrollContent: {
    type: Boolean,
    default: false
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  submitText: {
    type: String,
    default: 'Submit'
  },
  loading: {
    type: Boolean,
    default: false
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close', 'submit'])

const handleClose = () => {
  if (!props.loading && props.closeOnBackdrop) {
    emit('close')
  }
}

const handleSubmit = () => {
  if (!props.loading) {
    emit('submit')
  }
}
</script>
