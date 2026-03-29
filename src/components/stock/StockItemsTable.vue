<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useStockStore } from '@/store/stockStore'
import AlertBadge from './common/AlertBadge.vue'
import LoadingSpinner from './common/LoadingSpinner.vue'
import EmptyState from './common/EmptyState.vue'
import ConfirmModal from './common/ConfirmModal.vue'
import StockAdjustmentModal from './StockAdjustmentModal.vue'
import { formatCurrency, formatNumber, formatDate } from '@/utils/formatters'
import { debounce } from 'lodash-es'

const router = useRouter()
const stockStore = useStockStore()

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedAlertLevel = ref('')
const selectedLocation = ref('')
const showPerishableOnly = ref(false)
const showAvailableOnly = ref(true)

const currentPage = ref(1)
const itemsPerPage = ref(20)

// Modals
const showAdjustModal = ref(false)
const showDeleteModal = ref(false)
const selectedItem = ref(null)
const deleteLoading = ref(false)

// Computed filters
const filters = computed(() => ({
  search: searchQuery.value || undefined,
  categoryId: selectedCategory.value || undefined,
  alertLevel: selectedAlertLevel.value || undefined,
  location: selectedLocation.value || undefined,
  isPerishable: showPerishableOnly.value || undefined,
  isAvailable: showAvailableOnly.value || undefined
}))

// Filter items locally for better performance
const filteredItems = computed(() => {
  let items = [...stockStore.items]

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    items = items.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.sku.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query)
    )
  }

  if (selectedCategory.value) {
    items = items.filter(item => item.category?.id === selectedCategory.value)
  }

  if (selectedAlertLevel.value) {
    items = items.filter(item => item.alertLevel === selectedAlertLevel.value)
  }

  if (selectedLocation.value) {
    items = items.filter(item => item.location === selectedLocation.value)
  }

  if (showPerishableOnly.value) {
    items = items.filter(item => item.isPerishable)
  }

  if (showAvailableOnly.value) {
    items = items.filter(item => item.isAvailable)
  }

  return items
})

// Pagination
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredItems.value.slice(start, end)
})

const totalPages = computed(() =>
  Math.ceil(filteredItems.value.length / itemsPerPage.value)
)

// Unique values for filters
const categories = computed(() => {
  const cats = new Map()
  stockStore.items.forEach(item => {
    if (item.category) {
      cats.set(item.category.id, item.category.name)
    }
  })
  return Array.from(cats.entries()).map(([id, name]) => ({ id, name }))
})

const locations = computed(() => {
  const locs = new Set()
  stockStore.items.forEach(item => {
    if (item.location) locs.add(item.location)
  })
  return Array.from(locs)
})

// Actions
function viewDetails(item) {
  router.push(`/stock/items/${item.id}`)
}

function adjustStock(item) {
  selectedItem.value = item
  showAdjustModal.value = true
}

function viewMovements(item) {
  router.push(`/stock/items/${item.id}/movements`)
}

function viewBatches(item) {
  router.push(`/stock/batches?stockId=${item.id}`)
}

function confirmDelete(item) {
  selectedItem.value = item
  showDeleteModal.value = true
}

async function deleteItem() {
  if (!selectedItem.value) return

  deleteLoading.value = true
  try {
    await stockStore.deleteItem(selectedItem.value.id)
    showDeleteModal.value = false
    selectedItem.value = null
  } catch (error) {
    console.error('Failed to delete item:', error)
  } finally {
    deleteLoading.value = false
  }
}

function clearFilters() {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedAlertLevel.value = ''
  selectedLocation.value = ''
  showPerishableOnly.value = false
  showAvailableOnly.value = true
}

// Debounced search
const debouncedFetchItems = debounce(async () => {
  await stockStore.fetchItems(filters.value)
}, 500)

watch(filters, () => {
  currentPage.value = 1
})

onMounted(async () => {
  if (stockStore.items.length === 0) {
    await stockStore.fetchItems()
  }
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Stock Items</h1>
        <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Manage your inventory items
        </p>
      </div>

      <button
        @click="router.push('/stock/items/new')"
        class="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors inline-flex items-center gap-2"
      >
        <Icon icon="heroicons:plus" class="w-5 h-5" />
        Add Stock Item
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-slate-200 dark:border-slate-700">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Search -->
        <div class="relative">
          <Icon icon="heroicons:magnifying-glass" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name or SKU..."
            class="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <!-- Category Filter -->
        <select
          v-model="selectedCategory"
          class="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">All Categories</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>

        <!-- Alert Level Filter -->
        <select
          v-model="selectedAlertLevel"
          class="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">All Alert Levels</option>
          <option value="NORMAL">Normal</option>
          <option value="LOW">Low Stock</option>
          <option value="CRITICAL">Critical</option>
          <option value="OUT_OF_STOCK">Out of Stock</option>
        </select>

        <!-- Location Filter -->
        <select
          v-model="selectedLocation"
          class="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">All Locations</option>
          <option v-for="loc in locations" :key="loc" :value="loc">
            {{ loc }}
          </option>
        </select>
      </div>

      <div class="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div class="flex items-center gap-4">
          <label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
            <input
              v-model="showPerishableOnly"
              type="checkbox"
              class="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-primary-500 focus:ring-primary-500"
            />
            Perishable only
          </label>

          <label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
            <input
              v-model="showAvailableOnly"
              type="checkbox"
              class="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-primary-500 focus:ring-primary-500"
            />
            Available only
          </label>
        </div>

        <button
          @click="clearFilters"
          class="text-sm text-primary-500 hover:text-primary-600 font-medium"
        >
          Clear filters
        </button>
      </div>
    </div>

    <!-- Results Summary -->
    <div class="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
      <p>
        Showing {{ paginatedItems.length }} of {{ filteredItems.length }} items
        <span v-if="filteredItems.length !== stockStore.items.length">
          (filtered from {{ stockStore.items.length }} total)
        </span>
      </p>
    </div>

    <!-- Loading State -->
    <LoadingSpinner v-if="stockStore.loading && stockStore.items.length === 0" text="Loading stock items..." />

    <!-- Empty State -->
    <EmptyState
      v-else-if="!stockStore.loading && filteredItems.length === 0"
      icon="heroicons:cube"
      title="No stock items found"
      :description="searchQuery ? 'Try adjusting your search or filters' : 'Get started by adding your first stock item'"
      :action-text="!searchQuery ? 'Add Stock Item' : ''"
      @action="router.push('/stock/items/new')"
    />

    <!-- Table -->
    <div v-else class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Item
              </th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Category
              </th>
              <th class="px-4 py-3 text-right text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Quantity
              </th>
              <th class="px-4 py-3 text-right text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Available
              </th>
              <th class="px-4 py-3 text-center text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Status
              </th>
              <th class="px-4 py-3 text-right text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Value
              </th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Location
              </th>
              <th class="px-4 py-3 text-right text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
            <tr
              v-for="item in paginatedItems"
              :key="item.id"
              class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <td class="px-4 py-4">
                <div class="flex items-center gap-3">
                  <div
                    v-if="item.image"
                    class="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 flex-shrink-0"
                  >
                    <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                  </div>
                  <div
                    v-else
                    class="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0"
                  >
                    <Icon icon="heroicons:cube" class="w-5 h-5 text-slate-400" />
                  </div>
                  <div class="min-w-0">
                    <p class="font-medium text-slate-900 dark:text-white truncate">
                      {{ item.name }}
                    </p>
                    <p class="text-sm text-slate-500 dark:text-slate-400">
                      SKU: {{ item.sku }}
                    </p>
                  </div>
                </div>
              </td>

              <td class="px-4 py-4">
                <span class="text-sm text-slate-600 dark:text-slate-400">
                  {{ item.category?.name || '-' }}
                </span>
              </td>

              <td class="px-4 py-4 text-right">
                <p class="font-medium text-slate-900 dark:text-white">
                  {{ formatNumber(item.quantity) }} {{ item.uom }}
                </p>
                <p class="text-xs text-slate-500 dark:text-slate-400">
                  Min: {{ formatNumber(item.minLevel) }}
                </p>
              </td>

              <td class="px-4 py-4 text-right">
                <p class="font-medium text-slate-900 dark:text-white">
                  {{ formatNumber(item.availableQuantity) }}
                </p>
                <p v-if="item.reservedQuantity > 0" class="text-xs text-orange-600 dark:text-orange-400">
                  {{ formatNumber(item.reservedQuantity) }} reserved
                </p>
              </td>

              <td class="px-4 py-4 text-center">
                <AlertBadge :level="item.alertLevel" />
              </td>

              <td class="px-4 py-4 text-right">
                <p class="font-medium text-slate-900 dark:text-white">
                  {{ formatCurrency(item.currentValue) }}
                </p>
                <p class="text-xs text-slate-500 dark:text-slate-400">
                  @ {{ formatCurrency(item.averageCost) }}
                </p>
              </td>

              <td class="px-4 py-4">
                <span class="text-sm text-slate-600 dark:text-slate-400">
                  {{ item.location || '-' }}
                </span>
              </td>

              <td class="px-4 py-4">
                <div class="flex items-center justify-end gap-2">
                  <button
                    @click="viewDetails(item)"
                    class="p-1.5 text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-600 rounded transition-colors"
                    title="View Details"
                  >
                    <Icon icon="heroicons:eye" class="w-5 h-5" />
                  </button>

                  <button
                    @click="adjustStock(item)"
                    class="p-1.5 text-slate-600 dark:text-slate-400 hover:text-info-500 dark:hover:text-info-400 hover:bg-slate-100 dark:hover:bg-slate-600 rounded transition-colors"
                    title="Adjust Stock"
                  >
                    <Icon icon="heroicons:arrows-right-left" class="w-5 h-5" />
                  </button>

                  <button
                    @click="viewMovements(item)"
                    class="p-1.5 text-slate-600 dark:text-slate-400 hover:text-success-500 dark:hover:text-success-400 hover:bg-slate-100 dark:hover:bg-slate-600 rounded transition-colors"
                    title="View Movements"
                  >
                    <Icon icon="heroicons:clock" class="w-5 h-5" />
                  </button>

                  <button
                    v-if="item.isPerishable"
                    @click="viewBatches(item)"
                    class="p-1.5 text-slate-600 dark:text-slate-400 hover:text-warning-500 dark:hover:text-warning-400 hover:bg-slate-100 dark:hover:bg-slate-600 rounded transition-colors"
                    title="View Batches"
                  >
                    <Icon icon="heroicons:archive-box" class="w-5 h-5" />
                  </button>

                  <button
                    @click="confirmDelete(item)"
                    class="p-1.5 text-slate-600 dark:text-slate-400 hover:text-danger-500 dark:hover:text-danger-400 hover:bg-slate-100 dark:hover:bg-slate-600 rounded transition-colors"
                    title="Delete"
                  >
                    <Icon icon="heroicons:trash" class="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="px-4 py-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        <span class="text-sm text-slate-600 dark:text-slate-400">
          Page {{ currentPage }} of {{ totalPages }}
        </span>

        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Modals -->
    <StockAdjustmentModal
      v-if="selectedItem"
      v-model="showAdjustModal"
      :item="selectedItem"
      @adjusted="showAdjustModal = false"
    />

    <ConfirmModal
      v-model="showDeleteModal"
      title="Delete Stock Item"
      :message="`Are you sure you want to delete ${selectedItem?.name}? This action cannot be undone.`"
      variant="danger"
      confirm-text="Delete"
      :loading="deleteLoading"
      @confirm="deleteItem"
    />
  </div>
</template>
