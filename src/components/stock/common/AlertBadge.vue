<script setup>
import { computed } from 'vue'

const props = defineProps({
  level: { type: String, required: true }, // NORMAL, LOW, CRITICAL, OUT_OF_STOCK
  size: { type: String, default: 'md' }, // sm, md, lg
  showLabel: { type: Boolean, default: true }
})

const badgeClasses = computed(() => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full'

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  }

  const levelClasses = {
    NORMAL: 'bg-success-100 text-success-700 dark:bg-success-500/20 dark:text-success-400',
    LOW: 'bg-warning-100 text-warning-700 dark:bg-warning-500/20 dark:text-warning-400',
    CRITICAL: 'bg-danger-100 text-danger-700 dark:bg-danger-500/20 dark:text-danger-400',
    OUT_OF_STOCK: 'bg-danger-100 text-danger-800 dark:bg-danger-500/30 dark:text-danger-300'
  }

  return `${baseClasses} ${sizeClasses[props.size]} ${levelClasses[props.level] || levelClasses.NORMAL}`
})

const label = computed(() => {
  if (!props.showLabel) return ''

  const labels = {
    NORMAL: 'Normal',
    LOW: 'Low Stock',
    CRITICAL: 'Critical',
    OUT_OF_STOCK: 'Out of Stock'
  }

  return labels[props.level] || props.level
})
</script>

<template>
  <span :class="badgeClasses">
    <span
      class="w-1.5 h-1.5 rounded-full mr-1.5"
      :class="{
        'bg-success-500': level === 'NORMAL',
        'bg-warning-500': level === 'LOW',
        'bg-danger-500': level === 'CRITICAL' || level === 'OUT_OF_STOCK'
      }"
    ></span>
    {{ label }}
  </span>
</template>
