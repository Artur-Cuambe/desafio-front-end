<script setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  status: { type: String, required: true },
  type: { type: String, default: 'stockTake' }, // stockTake, quality, etc.
  size: { type: String, default: 'md' }
})

const config = computed(() => {
  const statusConfig = {
    stockTake: {
      DRAFT: { color: 'bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-400', icon: 'heroicons:document-text' },
      IN_PROGRESS: { color: 'bg-info-100 text-info-700 dark:bg-info-500/20 dark:text-info-400', icon: 'heroicons:arrow-path' },
      COMPLETED: { color: 'bg-success-100 text-success-700 dark:bg-success-500/20 dark:text-success-400', icon: 'heroicons:check-circle' },
      CANCELLED: { color: 'bg-danger-100 text-danger-700 dark:bg-danger-500/20 dark:text-danger-400', icon: 'heroicons:x-circle' },
      APPROVED: { color: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400', icon: 'heroicons:shield-check' }
    },
    quality: {
      GOOD: { color: 'bg-success-100 text-success-700 dark:bg-success-500/20 dark:text-success-400', icon: 'heroicons:check-badge' },
      FAIR: { color: 'bg-warning-100 text-warning-700 dark:bg-warning-500/20 dark:text-warning-400', icon: 'heroicons:exclamation-triangle' },
      POOR: { color: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400', icon: 'heroicons:exclamation-circle' },
      EXPIRED: { color: 'bg-danger-100 text-danger-700 dark:bg-danger-500/20 dark:text-danger-400', icon: 'heroicons:x-circle' },
      QUARANTINED: { color: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400', icon: 'heroicons:lock-closed' }
    }
  }

  return statusConfig[props.type]?.[props.status] || { color: 'bg-slate-100 text-slate-700', icon: '' }
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  }
  return sizes[props.size]
})
</script>

<template>
  <span
    :class="[config.color, sizeClasses]"
    class="inline-flex items-center gap-1 font-medium rounded-full"
  >
    <Icon v-if="config.icon" :icon="config.icon" class="w-4 h-4" />
    {{ status.replace('_', ' ') }}
  </span>
</template>
