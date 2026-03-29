<script setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  title: { type: String, required: true },
  value: { type: [String, Number], required: true },
  icon: { type: String, default: '' },
  iconClass: { type: String, default: 'bg-primary-500' },
  trend: { type: String, default: '' }, // 'up', 'down', or ''
  trendValue: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  loading: { type: Boolean, default: false }
})

const trendIcon = computed(() => {
  if (props.trend === 'up') return 'heroicons:arrow-trending-up'
  if (props.trend === 'down') return 'heroicons:arrow-trending-down'
  return ''
})

const trendClass = computed(() => {
  if (props.trend === 'up') return 'text-success-500'
  if (props.trend === 'down') return 'text-danger-500'
  return 'text-slate-500'
})
</script>

<template>
  <div class="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700">
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
          {{ title }}
        </p>

        <div v-if="loading" class="animate-pulse">
          <div class="h-8 bg-slate-200 dark:bg-slate-700 rounded w-24 mb-2"></div>
        </div>
        <div v-else>
          <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-1">
            {{ value }}
          </h3>
        </div>

        <div v-if="subtitle || trendValue" class="flex items-center gap-2 text-sm">
          <span v-if="trendValue" :class="trendClass" class="flex items-center gap-1 font-medium">
            <Icon v-if="trendIcon" :icon="trendIcon" class="w-4 h-4" />
            {{ trendValue }}
          </span>
          <span v-if="subtitle" class="text-slate-500 dark:text-slate-400">
            {{ subtitle }}
          </span>
        </div>
      </div>

      <div
        v-if="icon"
        :class="iconClass"
        class="w-12 h-12 rounded-lg flex items-center justify-center bg-opacity-10"
      >
        <Icon :icon="icon" class="w-6 h-6" :class="iconClass.replace('bg-', 'text-')" />
      </div>
    </div>
  </div>
</template>
