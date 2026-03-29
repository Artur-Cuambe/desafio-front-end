<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  icon: { type: String, default: 'heroicons:inbox' },
  title: { type: String, default: 'No data available' },
  description: { type: String, default: '' },
  actionText: { type: String, default: '' }
})

const emit = defineEmits(['action'])
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 px-4">
    <div class="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
      <Icon :icon="icon" class="w-8 h-8 text-slate-400 dark:text-slate-500" />
    </div>

    <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">
      {{ title }}
    </h3>

    <p v-if="description" class="text-sm text-slate-600 dark:text-slate-400 text-center max-w-sm mb-6">
      {{ description }}
    </p>

    <button
      v-if="actionText"
      @click="emit('action')"
      class="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors"
    >
      {{ actionText }}
    </button>

    <slot></slot>
  </div>
</template>
