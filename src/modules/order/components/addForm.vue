<template>
  <div class="">
    <div class="cursor-pointer" @click="open">
      <slot></slot>
    </div>
    <Modal
      :activeModal="openModal"
      @close="close"
      :centered="true"
      sizeClass="max-w-lg"
    >
      <div class="p-6 bg-white dark:bg-slate-800 rounded-lg">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-5">
          {{ $t("Pedido") }}
        </h3>

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

            <!-- <InputGroup
              v-model.number="entityForm.customerId"
              :error="entityForm.customerIdError"
              type="number"
              :placeholder="$t('Insert custumer')"
              prependIcon="heroicons-outline:office-building"
              merged
            /> -->

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
    </Modal>
  </div>
</template>

<script setup lang="ts">
import Modal from "@/components/Modal/ModalC.vue";
import InputGroup from "@/components/InputGroup/index.vue";
import Textarea from "@/components/Textarea/index.vue";
import { onMounted, ref, computed } from "vue";
import Button from "@/components/Button/index.vue";
import { UseForm } from "../composables/useForm";
import { CreateOrderDto } from "@/api";
import { useCRUD } from "../composables/useCRUD";
import vSelect from "vue-select";
import { useGetAllQuery } from "@/modules/customer/composables/useGetAllQuery";
import "vue-select/dist/vue-select.css";

defineProps({});

const emit = defineEmits(["refetch"]);
const openModal = ref(false);
const { handleSubmit, resetForm, ...fields } = UseForm();
const { createItem, isPending, editingItem } = useCRUD(async (params) => {
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

const open = () => {
  openModal.value = true;
};

const close = () => {
  openModal.value = false;
};

const status = [
  { label: "Pendente", value: "PENDING" },
  { label: "Em trânsito", value: "IN_PROGRESS" },
  { label: "Entregue", value: "COMPLETED" },
];

const onSubmit = handleSubmit(async () => {
  const data: CreateOrderDto = {
    customerId: parseInt(`${entityForm.value.customerId}`),
    entityId: parseInt(`${entityForm.value.entityId}`),
    deliveryAddress: `${entityForm.value.deliveryAddress}`,
    deliveryNotes: `${entityForm.value.deliveryNotes}`,
    status: `${entityForm.value.status}`,
  };

  await createItem(data);
  resetForm();
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

onMounted(() => {});
</script>
