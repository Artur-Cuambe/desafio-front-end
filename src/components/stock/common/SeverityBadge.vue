<script setup>
import { computed } from 'vue'

const props = defineProps({
  severity: { type: String, required: true }, // LOW, MEDIUM, HIGH, CRITICAL
  size: { type: String, default: 'md' }
})

const badgeClasses = computed(() => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full'

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  }

  const severityClasses = {
    LOW: 'bg-info-100 text-info-700 dark:bg-info-500/20 dark:text-info-400',
    MEDIUM: 'bg-warning-100 text-warning-700 dark:bg-warning-500/20 dark:text-warning-400',
    HIGH: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400',
    CRITICAL: 'bg-danger-100 text-danger-700 dark:bg-danger-500/20 dark:text-danger-400'
  }

  return `${baseClasses} ${sizeClasses[props.size]} ${severityClasses[props.severity] || severityClasses.LOW}`
})
</script>

<template>
  <span :class="badgeClasses">
    {{ severity }}
  </span>
</template>
