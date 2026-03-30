<template>
  <div
    v-if="openEditForm"
    class="fixed inset-0 bg-black bg-opacity-10 z-[999] flex items-center justify-center p-4"
  >
    <!-- Backdrop with blur -->
    <div class="absolute inset-0 bg-opacity-70 backdrop-blur-sm"></div>

    <!-- Modal content (with relative positioning to appear above the backdrop) -->
    <div class="bg-white dark:bg-slate-800 rounded-lg max-w-md w-full relative">
      <div class="bg-white dark:bg-slate-800 rounded-lg max-w-md w-full">
        <div
          class="p-3  flex justify-between items-center"
        >
          <h2 class="text-xl font-bold">Actualizar estado do pedido</h2>
          <button @click="emit('close')" class="text-gray-400 hover:text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="p-6">
          <div class="mb-6">
            <h3 class="text-sm font-medium text-gray-400 mb-2">
              Pedido #{{ selectedEntity.ref }}
            </h3>
            <p>
              Estado actual:
              <Badge
                :label="$t(selectedEntity.status)"
                :badgeClass="
                  selectedEntity.status == 'PENDING'
                    ? 'bg-gray-500 text-white'
                    : selectedEntity.status == 'COMPLETED'
                    ? 'bg-success-500 text-white'
                    : 'bg-warning-500 text-white'
                "
              />
            </p>
          </div>

          <div class="space-y-3 mb-4">
            <div
              v-for="status in statusData"
              :key="status.value"
              @click="selectedEntity.newStatus = status.value"
              :class="[
                'p-3 rounded-lg cursor-pointer flex items-center',
                selectedEntity.newStatus === status.value
                  ? status.activeClass
                  : 'border border-gray-500 hover:bg-slate-600',
              ]"
            >
              <!-- <div
                :class="[
                  'w-5 h-5 rounded-full mr-3 flex items-center justify-center',
                  selectedEntity.newStatus === status.value
                    ? 'bg-white'
                    : 'border border-gray-500',
                ]"
              >
              <div
                  v-if="selectedEntity.newStatus === status.value"
                  class="w-3 h-3 rounded-full bg-slate-800"
                ></div> 
              </div> -->
              <span>{{ status.label }}</span>
            </div>

            <div class="flex justify-end space-x-3">
              <button
                @click="emit('close')"
                class="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium text-white"
              >
                Cancel
              </button>
              <button
                @click="onSubmit"
                class="px-4 py-2 bg-primary-500 rounded-lg text-sm font-medium text-white"
              >
                Actualizar estado
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import Button from "@/components/Button/index.vue";
import { UseForm } from "../composables/useForm";
import { UpdateOrderDto } from "@/api";
import { useCRUD } from "../composables/useCRUD";
import { useGetAllQuery } from "@/modules/customer/composables/useGetAllQuery";
import "vue-select/dist/vue-select.css";
import Badge from "@/components/Badge/index.vue";

const { selectedEntity, openEditForm } = defineProps({
  selectedEntity: Object,
  openEditForm: Boolean,
});

const emit = defineEmits(["refetch", "close", "clearSelection"]);

const { handleSubmit, ...fields } = UseForm();
const { saveItem, isPending, editingItem } = useCRUD(async (params) => {
  emit("refetch");
});

const {
  items,
  page,
  perPage,
  onPageChange,
  total,
  loading,
  loadData,
  onSearch,
} = useGetAllQuery();

const entityForm = ref(fields);

const close = () => {
  emit("clearSelection");
  emit("close");
};

const status = [
  {
    label: "Pendente",
    value: "PENDING",
    activeClass: "bg-gray-600 text-white",
    inactiveClass: "bg-slate-700 hover:bg-slate-600 text-white",
  },
  {
    label: "Em trânsito",
    value: "IN_PROGRESS",
    activeClass: "bg-yellow-500 text-white",
    inactiveClass: "bg-slate-700 hover:bg-slate-600 text-white",
  },
  {
    label: "Entregue",
    value: "COMPLETED",
    activeClass: "bg-green-500 text-white",
    inactiveClass: "bg-slate-700 hover:bg-slate-600 text-white",
  },
];

const onSubmit = handleSubmit(async () => {
  const data: UpdateOrderDto = {
    customerId: parseInt(`${entityForm.value.customerId}`),
    entityId: parseInt(`${entityForm.value.entityId}`),
    deliveryAddress: `${entityForm.value.deliveryAddress}`,
    deliveryNotes: `${entityForm.value.deliveryNotes}`,
    status: `${selectedEntity.newStatus}`,
  };
  editingItem.value = { ...data, id: selectedEntity.id };
  await saveItem();
  close();
});

const customerData = computed(() => {
  if (!loading.value) {
    return items.value?.map((item) => {
      return {
        label: `${item.firstName}`,
        value: item.id,
      };
    });
  }
  return [];
});

const statusData = computed(() => {
  return status?.map((item) => {
    return {
      ...item,
    };
  });
});

const onSearchCustomer = (search, loading) => {
  loading(true);
  setTimeout(() => {
    onSearch(search);
    search = null;
    // searchSup.value = "";
    loading(false);
  }, 0);
};

onMounted(() => {
  if (selectedEntity && selectedEntity.id) {
    entityForm.value.customerId = selectedEntity.customerId;
    entityForm.value.entityId = selectedEntity.entityId;
    entityForm.value.deliveryAddress = selectedEntity.deliveryAddress;
    entityForm.value.deliveryNotes = selectedEntity.deliveryNotes;
    entityForm.value.status = selectedEntity.status;
  }
});
</script>
