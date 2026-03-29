<template>
  <div class="">
    <DialogModal>
      <template #title>
        <div class="px-6 pt-6 bg-white dark:bg-slate-800 rounded-lg">
          {{ $t("Pedido") }}
        </div></template
      >
      <template #body>
        <div class="px-6 pt-0 bg-white dark:bg-slate-800 rounded-lg">
          <!-- <pre>{{ selectedEntity }}</pre> -->
          <div class="flex flex-col gap-6 dark:text-gray-100">
            <form @submit.prevent="onSubmit" class="space-y-4">
              <vSelect
                class="dark:text-black-500 dark:bg-black-300"
                v-model="entityForm.customerId"
                :reduce="(per) => per.value"
                :options="customerData"
                :error="entityForm.customerIdError"
                :filterable="false"
                @search="onSearchCustomer"
              >
              </vSelect>

              <InputGroup
                v-model.trim="entityForm.deliveryAddress"
                :error="entityForm.deliveryAddressError"
                type="text"
                :placeholder="$t('Insert address')"
                prependIcon="heroicons-outline:document-text"
                merged
              />

              <Textarea
                v-model.trim="entityForm.deliveryNotes"
                :error="entityForm.deliveryNotesError"
                :placeholder="$t('Insert description')"
                prependIcon="heroicons-outline:document-text"
                merged
              />

              <InputGroup
                hidden
                v-model.number="entityForm.entityId"
                :error="entityForm.entityIdError"
                type="number"
                :placeholder="$t('Insert entity')"
                prependIcon="heroicons-outline:document-text"
                merged
              />
              <vSelect
                class="dark:text-black-500 dark:bg-black-300"
                v-model="entityForm.status"
                :reduce="(per) => per.value"
                :options="statusData"
                :error="entityForm.statusError"
              >
              </vSelect>

              <div class="flex justify-end gap-3 pt-3">
                <Button
                  text="dark"
                  btnClass="btn-outline-dark"
                  type="button"
                  @click="close"
                >
                  {{ $t("cancel") }}
                </Button>
                <Button
                  text="dark"
                  btnClass="btn-primary"
                  type="submit"
                  :isLoading="isPending"
                  :isDisabled="isPending"
                >
                  {{ $t("save") }}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </template>
    </DialogModal>
  </div>
</template>

<script setup lang="ts">
import DialogModal from "@/components/mbmComponents/dialog-modal-component.vue";
import InputGroup from "@/components/InputGroup/index.vue";
import { onMounted, ref, computed } from "vue";
import Button from "@/components/Button/index.vue";
import { UseForm } from "../composables/useForm";
import { UpdateOrderDto } from "@/api";
import { useCRUD } from "../composables/useCRUD";
import vSelect from "vue-select";
import { useGetAllQuery } from "@/modules/customer/composables/useGetAllQuery";
import Textarea from "@/components/Textarea/index.vue";
import "vue-select/dist/vue-select.css";

const { selectedEntity } = defineProps({ selectedEntity: Object });

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
  { label: "Pendente", value: "PENDING" },
  { label: "Em trânsito", value: "IN_PROGRESS" },
  { label: "Entregue", value: "COMPLETED" },
];

const onSubmit = handleSubmit(async () => {
  const data: UpdateOrderDto = {
    customerId: parseInt(`${entityForm.value.customerId}`),
    entityId: parseInt(`${entityForm.value.entityId}`),
    deliveryAddress: `${entityForm.value.deliveryAddress}`,
    deliveryNotes: `${entityForm.value.deliveryNotes}`,
    status: `${entityForm.value.status}`,
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
