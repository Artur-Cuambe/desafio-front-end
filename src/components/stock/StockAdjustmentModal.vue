<script setup>
import { ref, computed } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { Icon } from '@iconify/vue'
import { useStockStore } from '@/store/stockStore'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  item: { type: Object, required: true }
})

const emit = defineEmits(['update:modelValue', 'adjusted'])

const stockStore = useStockStore()

const adjustmentType = ref('increase') // 'increase' or 'decrease'
const quantity = ref('')
const reason = ref('')
const reference = ref('')
const notes = ref('')
const loading = ref(false)
const error = ref(null)

const close = () => {
  if (!loading.value) {
    emit('update:modelValue', false)
    resetForm()
  }
}

const resetForm = () => {
  adjustmentType.value = 'increase'
  quantity.value = ''
  reason.value = ''
  reference.value = ''
  notes.value = ''
  error.value = null
}

const isValid = computed(() => {
  return quantity.value && parseFloat(quantity.value) > 0
})

async function handleSubmit() {
  if (!isValid.value) {
    error.value = 'Please enter a valid quantity'
    return
  }

  loading.value = true
  error.value = null

  try {
    const adjustmentQuantity = adjustmentType.value === 'decrease'
      ? -parseFloat(quantity.value)
      : parseFloat(quantity.value)

    await stockStore.adjustStock(props.item.id, {
      quantity: adjustmentQuantity,
      reason: reason.value || undefined,
      reference: reference.value || undefined,
      notes: notes.value || undefined
    })

    emit('adjusted')
    close()
  } catch (e) {
    error.value = e.response?.data?.message || 'Failed to adjust stock'
  } finally {
    loading.value = false
  }
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
              <div class="flex items-start justify-between mb-6">
                <div>
                  <DialogTitle class="text-lg font-semibold text-slate-900 dark:text-white">
                    Adjust Stock Quantity
                  </DialogTitle>
                  <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {{ item.name }}
                  </p>
                </div>
                <button
                  @click="close"
                  class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <Icon icon="heroicons:x-mark" class="w-6 h-6" />
                </button>
              </div>

              <!-- Current Stock Info -->
              <div class="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 mb-6">
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p class="text-slate-600 dark:text-slate-400">Current Quantity</p>
                    <p class="font-semibold text-slate-900 dark:text-white mt-1">
                      {{ item.quantity }} {{ item.uom }}
                    </p>
                  </div>
                  <div>
                    <p class="text-slate-600 dark:text-slate-400">Available</p>
                    <p class="font-semibold text-slate-900 dark:text-white mt-1">
                      {{ item.availableQuantity }} {{ item.uom }}
                    </p>
                  </div>
                </div>
              </div>

              <form @submit.prevent="handleSubmit" class="space-y-4">
                <!-- Adjustment Type -->
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Adjustment Type
                  </label>
                  <div class="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      @click="adjustmentType = 'increase'"
                      :class="[
                        'px-4 py-2.5 rounded-lg border-2 font-medium transition-all',
                        adjustmentType === 'increase'
                          ? 'border-success-500 bg-success-50 dark:bg-success-500/20 text-success-700 dark:text-success-400'
                          : 'border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-success-300'
                      ]"
                    >
                      <Icon icon="heroicons:plus-circle" class="w-5 h-5 inline mr-2" />
                      Increase
                    </button>
                    <button
                      type="button"
                      @click="adjustmentType = 'decrease'"
                      :class="[
                        'px-4 py-2.5 rounded-lg border-2 font-medium transition-all',
                        adjustmentType === 'decrease'
                          ? 'border-danger-500 bg-danger-50 dark:bg-danger-500/20 text-danger-700 dark:text-danger-400'
                          : 'border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-danger-300'
                      ]"
                    >
                      <Icon icon="heroicons:minus-circle" class="w-5 h-5 inline mr-2" />
                      Decrease
                    </button>
                  </div>
                </div>

                <!-- Quantity -->
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Quantity <span class="text-danger-500">*</span>
                  </label>
                  <div class="relative">
                    <input
                      v-model="quantity"
                      type="number"
                      step="0.01"
                      min="0.01"
                      required
                      placeholder="Enter quantity"
                      class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <span class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 dark:text-slate-400">
                      {{ item.uom }}
                    </span>
                  </div>
                </div>

                <!-- Reason -->
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Reason
                  </label>
                  <select
                    v-model="reason"
                    class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select reason (optional)</option>
                    <option value="purchase">Purchase/Receiving</option>
                    <option value="sale">Sale/Issue</option>
                    <option value="damaged">Damaged</option>
                    <option value="expired">Expired</option>
                    <option value="returned">Returned</option>
                    <option value="adjustment">Inventory Adjustment</option>
                    <option value="transfer">Transfer</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <!-- Reference -->
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Reference Number
                  </label>
                  <input
                    v-model="reference"
                    type="text"
                    placeholder="e.g., PO-1234, INV-5678"
                    class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <!-- Notes -->
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Notes
                  </label>
                  <textarea
                    v-model="notes"
                    rows="3"
                    placeholder="Additional notes..."
                    class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  ></textarea>
                </div>

                <!-- Error Message -->
                <div v-if="error" class="p-3 bg-danger-50 dark:bg-danger-500/20 border border-danger-200 dark:border-danger-500/30 rounded-lg">
                  <p class="text-sm text-danger-700 dark:text-danger-400">
                    {{ error }}
                  </p>
                </div>

                <!-- Actions -->
                <div class="flex items-center justify-end gap-3 pt-4">
                  <button
                    type="button"
                    @click="close"
                    :disabled="loading"
                    class="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    :disabled="!isValid || loading"
                    class="px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-2"
                  >
                    <Icon v-if="loading" icon="heroicons:arrow-path" class="w-4 h-4 animate-spin" />
                    {{ adjustmentType === 'increase' ? 'Increase' : 'Decrease' }} Stock
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
