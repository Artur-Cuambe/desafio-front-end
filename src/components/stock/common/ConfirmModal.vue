<script setup>
import { ref } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: 'Confirm Action' },
  message: { type: String, default: 'Are you sure you want to proceed?' },
  confirmText: { type: String, default: 'Confirm' },
  cancelText: { type: String, default: 'Cancel' },
  variant: { type: String, default: 'primary' }, // primary, danger, warning
  loading: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const close = () => {
  if (!props.loading) {
    emit('update:modelValue', false)
    emit('cancel')
  }
}

const confirm = () => {
  emit('confirm')
}

const variantClasses = {
  primary: 'bg-primary-500 hover:bg-primary-600 text-white',
  danger: 'bg-danger-500 hover:bg-danger-600 text-white',
  warning: 'bg-warning-500 hover:bg-warning-600 text-white'
}

const iconClasses = {
  primary: 'bg-primary-100 text-primary-600',
  danger: 'bg-danger-100 text-danger-600',
  warning: 'bg-warning-100 text-warning-600'
}

const icons = {
  primary: 'heroicons:question-mark-circle',
  danger: 'heroicons:exclamation-triangle',
  warning: 'heroicons:exclamation-circle'
}
</script>

<template>
  <TransitionRoot :show="modelValue" as="template">
    <Dialog as="div" class="relative z-50" @close="close">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70"></div>
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 p-6 shadow-xl transition-all">
              <div class="flex items-start gap-4">
                <div :class="iconClasses[variant]" class="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center">
                  <Icon :icon="icons[variant]" class="w-6 h-6" />
                </div>

                <div class="flex-1">
                  <DialogTitle class="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {{ title }}
                  </DialogTitle>
                  <p class="text-sm text-slate-600 dark:text-slate-400">
                    {{ message }}
                  </p>
                </div>
              </div>

              <div class="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  :disabled="loading"
                  @click="close"
                  class="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {{ cancelText }}
                </button>
                <button
                  type="button"
                  :disabled="loading"
                  @click="confirm"
                  :class="variantClasses[variant]"
                  class="px-4 py-2 text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-2"
                >
                  <Icon v-if="loading" icon="heroicons:arrow-path" class="w-4 h-4 animate-spin" />
                  {{ confirmText }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
