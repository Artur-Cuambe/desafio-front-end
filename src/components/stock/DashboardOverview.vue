<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useStockStore } from '@/store/stockStore'
import { useAlertStore } from '@/store/alertStore'
import { useBatchStore } from '@/store/batchStore'
import { useWasteStore } from '@/store/wasteStore'
import { dashboardApi } from '@/services/stockApi'
import MetricCard from './common/MetricCard.vue'
import AlertBadge from './common/AlertBadge.vue'
import SeverityBadge from './common/SeverityBadge.vue'
import LoadingSpinner from './common/LoadingSpinner.vue'
import { formatCurrency, formatNumber, formatRelativeTime, formatEnumValue } from '@/utils/formatters'
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js'
import { Pie, Bar, Line } from 'vue-chartjs'

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend)

const router = useRouter()
const stockStore = useStockStore()
const alertStore = useAlertStore()
const batchStore = useBatchStore()
const wasteStore = useWasteStore()

const loading = ref(false)
const metrics = ref({
  totalStockValue: 0,
  lowStockCount: 0,
  outOfStockCount: 0,
  wasteValueThisMonth: 0,
  activeAlertsCount: 0,
  expiringBatchesCount: 0
})

// Fetch dashboard data
async function fetchDashboardData() {
  loading.value = true
  try {
    const data = await dashboardApi.getMetrics()
    metrics.value = data

    // Also fetch detailed data for charts
    await Promise.all([
      stockStore.fetchItems(),
      alertStore.fetchUnresolvedAlerts(),
      batchStore.fetchExpiringBatches(7),
      wasteStore.fetchMonthlyWaste()
    ])
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error)
  } finally {
    loading.value = false
  }
}

// Stock by category chart data
const stockByCategoryData = computed(() => {
  const categoryMap = new Map()

  stockStore.items.forEach(item => {
    const category = item.category?.name || 'Uncategorized'
    const current = categoryMap.get(category) || 0
    categoryMap.set(category, current + item.currentValue)
  })

  return {
    labels: Array.from(categoryMap.keys()),
    datasets: [{
      data: Array.from(categoryMap.values()),
      backgroundColor: [
        '#3b82f6',
        '#10b981',
        '#f59e0b',
        '#ef4444',
        '#8b5cf6',
        '#ec4899',
        '#14b8a6',
        '#f97316'
      ]
    }]
  }
})

// Alert severity distribution
const alertSeverityData = computed(() => {
  const severityCounts = {
    LOW: 0,
    MEDIUM: 0,
    HIGH: 0,
    CRITICAL: 0
  }

  alertStore.alerts.forEach(alert => {
    if (severityCounts[alert.severity] !== undefined) {
      severityCounts[alert.severity]++
    }
  })

  return {
    labels: Object.keys(severityCounts),
    datasets: [{
      label: 'Alerts',
      data: Object.values(severityCounts),
      backgroundColor: ['#3b82f6', '#f59e0b', '#f97316', '#ef4444']
    }]
  }
})

// Waste by reason chart data
const wasteByReasonData = computed(() => {
  const reasonMap = new Map()

  wasteStore.wasteLogs.forEach(log => {
    const reason = formatEnumValue(log.wasteReason)
    const current = reasonMap.get(reason) || 0
    reasonMap.set(reason, current + log.totalValue)
  })

  const sortedEntries = Array.from(reasonMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7)

  return {
    labels: sortedEntries.map(e => e[0]),
    datasets: [{
      label: 'Waste Value',
      data: sortedEntries.map(e => e[1]),
      backgroundColor: '#ef4444'
    }]
  }
})

// Chart options
const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
}

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
}

// Recent alerts for activity feed
const recentAlerts = computed(() => {
  return alertStore.alerts
    .slice(0, 5)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

// Quick actions
const quickActions = [
  {
    title: 'Add Stock Item',
    icon: 'heroicons:plus-circle',
    color: 'bg-primary-500',
    route: '/stock/items/new'
  },
  {
    title: 'Adjust Stock',
    icon: 'heroicons:arrows-right-left',
    color: 'bg-info-500',
    route: '/stock/items'
  },
  {
    title: 'Start Stock Take',
    icon: 'heroicons:clipboard-document-list',
    color: 'bg-success-500',
    route: '/stock/stock-take/new'
  },
  {
    title: 'Log Waste',
    icon: 'heroicons:trash',
    color: 'bg-warning-500',
    route: '/stock/waste/new'
  }
]

function handleQuickAction(action) {
  if (action.route) {
    router.push(action.route)
  }
}

onMounted(() => {
  fetchDashboardData()
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Stock Management</h1>
        <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Overview of your inventory and stock metrics
        </p>
      </div>

      <button
        @click="fetchDashboardData"
        :disabled="loading"
        class="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors inline-flex items-center gap-2"
      >
        <Icon icon="heroicons:arrow-path" :class="{ 'animate-spin': loading }" class="w-4 h-4" />
        Refresh
      </button>
    </div>

    <!-- Loading State -->
    <LoadingSpinner v-if="loading && stockStore.items.length === 0" text="Loading dashboard data..." />

    <template v-else>
      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Total Stock Value"
          :value="formatCurrency(metrics.totalStockValue)"
          icon="heroicons:currency-dollar"
          icon-class="bg-success-500"
          :loading="loading"
        />

        <MetricCard
          title="Low Stock Items"
          :value="formatNumber(metrics.lowStockCount)"
          icon="heroicons:exclamation-triangle"
          icon-class="bg-warning-500"
          :loading="loading"
        />

        <MetricCard
          title="Out of Stock"
          :value="formatNumber(metrics.outOfStockCount)"
          icon="heroicons:x-circle"
          icon-class="bg-danger-500"
          :loading="loading"
        />

        <MetricCard
          title="Waste This Month"
          :value="formatCurrency(metrics.wasteValueThisMonth)"
          icon="heroicons:trash"
          icon-class="bg-orange-500"
          :loading="loading"
        />

        <MetricCard
          title="Active Alerts"
          :value="formatNumber(metrics.activeAlertsCount)"
          icon="heroicons:bell-alert"
          icon-class="bg-danger-500"
          :loading="loading"
        />

        <MetricCard
          title="Expiring Batches (7 days)"
          :value="formatNumber(metrics.expiringBatchesCount)"
          icon="heroicons:clock"
          icon-class="bg-info-500"
          :loading="loading"
        />
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Stock Value by Category -->
        <div class="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Stock Value by Category
          </h3>
          <div class="h-64">
            <Pie v-if="stockByCategoryData.labels.length > 0" :data="stockByCategoryData" :options="pieOptions" />
            <div v-else class="flex items-center justify-center h-full text-slate-500">
              No category data available
            </div>
          </div>
        </div>

        <!-- Waste by Reason -->
        <div class="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Waste by Reason (This Month)
          </h3>
          <div class="h-64">
            <Bar v-if="wasteByReasonData.labels.length > 0" :data="wasteByReasonData" :options="barOptions" />
            <div v-else class="flex items-center justify-center h-full text-slate-500">
              No waste data available
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions and Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Quick Actions -->
        <div class="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <button
              v-for="action in quickActions"
              :key="action.title"
              @click="handleQuickAction(action)"
              class="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors text-left group"
            >
              <div :class="action.color" class="w-10 h-10 rounded-lg bg-opacity-10 flex items-center justify-center mb-3">
                <Icon :icon="action.icon" class="w-5 h-5" :class="action.color.replace('bg-', 'text-')" />
              </div>
              <p class="text-sm font-medium text-slate-900 dark:text-white group-hover:text-primary-500">
                {{ action.title }}
              </p>
            </button>
          </div>
        </div>

        <!-- Recent Alerts -->
        <div class="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
              Recent Alerts
            </h3>
            <button
              @click="router.push('/stock/alerts')"
              class="text-sm text-primary-500 hover:text-primary-600 font-medium"
            >
              View all
            </button>
          </div>

          <div v-if="recentAlerts.length > 0" class="space-y-3">
            <div
              v-for="alert in recentAlerts"
              :key="alert.id"
              class="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
            >
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <SeverityBadge :severity="alert.severity" size="sm" />
                  <span class="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {{ alert.stock?.name || 'Unknown Item' }}
                  </span>
                </div>
                <p class="text-xs text-slate-600 dark:text-slate-400">
                  {{ alert.message || formatEnumValue(alert.type) }}
                </p>
                <p class="text-xs text-slate-500 dark:text-slate-500 mt-1">
                  {{ formatRelativeTime(alert.createdAt) }}
                </p>
              </div>

              <button
                v-if="!alert.isResolved"
                @click="router.push('/stock/alerts')"
                class="text-primary-500 hover:text-primary-600"
              >
                <Icon icon="heroicons:arrow-right" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div v-else class="text-center py-8 text-slate-500 dark:text-slate-400">
            <Icon icon="heroicons:bell-slash" class="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p class="text-sm">No recent alerts</p>
          </div>
        </div>
      </div>

      <!-- Low Stock Items Alert -->
      <div
        v-if="stockStore.lowStockItems.length > 0"
        class="bg-warning-50 dark:bg-warning-500/10 border border-warning-200 dark:border-warning-500/30 rounded-lg p-4"
      >
        <div class="flex items-start gap-3">
          <Icon icon="heroicons:exclamation-triangle" class="w-6 h-6 text-warning-600 dark:text-warning-400 flex-shrink-0 mt-0.5" />
          <div class="flex-1">
            <h4 class="font-semibold text-warning-900 dark:text-warning-300 mb-1">
              Low Stock Alert
            </h4>
            <p class="text-sm text-warning-800 dark:text-warning-400 mb-3">
              You have {{ stockStore.lowStockItems.length }} items running low on stock.
            </p>
            <button
              @click="router.push('/stock/items?filter=low')"
              class="text-sm font-medium text-warning-700 dark:text-warning-300 hover:text-warning-800 dark:hover:text-warning-200 inline-flex items-center gap-1"
            >
              View items
              <Icon icon="heroicons:arrow-right" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
