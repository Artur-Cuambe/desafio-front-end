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
              <InputGroup
                v-model.number="entityForm.customerId"
                :error="entityForm.customerIdError"
                type="number"
                :placeholder="$t('Insert custumer')"
                prependIcon="heroicons-outline:office-building"
                merged
              />

              <InputGroup
                v-model.trim="entityForm.deliveryAddress"
                :error="entityForm.deliveryAddressError"
                type="text"
                :placeholder="$t('Insert address')"
                prependIcon="heroicons-outline:document-text"
                merged
              />

              <InputGroup
                v-model.trim="entityForm.deliveryNotes"
                :error="entityForm.deliveryNotesError"
                type="text"
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
              <InputGroup
                v-model="entityForm.status"
                :error="entityForm.statusError"
                type="text"
                :placeholder="$t('Insert status')"
                prependIcon="heroicons-outline:document-text"
                merged
              />
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
import { onMounted, ref } from "vue";
import Button from "@/components/Button/index.vue";
import { UseForm } from "../composables/useForm";
import { UpdateOrderDto } from "@/api";
import { useCRUD } from "../composables/useCRUD";

const { selectedEntity } = defineProps({ selectedEntity: Object });

const emit = defineEmits(["refetch", "close", "clearSelection"]);

const { handleSubmit, ...fields } = UseForm();
const { saveItem, isPending, editingItem } = useCRUD(async (params) => {
  emit("refetch");
});
const entityForm = ref(fields);

const close = () => {
  emit("clearSelection");
  emit("close");
};

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
