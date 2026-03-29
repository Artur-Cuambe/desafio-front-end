<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  size: { type: String, default: 'md' }, // sm, md, lg
  text: { type: String, default: '' }
})

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12'
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-3 py-8">
    <Icon
      icon="heroicons:arrow-path"
      :class="sizeClasses[size]"
      class="text-primary-500 animate-spin"
    />
    <p v-if="text" class="text-sm text-slate-600 dark:text-slate-400">
      {{ text }}
    </p>
  </div>
</template>
