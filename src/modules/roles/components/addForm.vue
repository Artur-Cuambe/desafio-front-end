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
          {{ $t("role") }}
        </h3>

        <div class="flex flex-col gap-6 dark:text-gray-100">
          <form @submit.prevent="onSubmit" class="space-y-4">
            <InputGroup
              v-model.trim="entityForm.name"
              :error="entityForm.nameError"
              type="text"
              :placeholder="$t('Insert name')"
              prependIcon="heroicons-outline:office-building"
              merged
            />

            <InputGroup
              v-model.trim="entityForm.departmentId"
              :error="entityForm.departmentIdError"
              type="text"
              :placeholder="$t('Insert department')"
              prependIcon="heroicons-outline:document-text"
              merged
            />

            <!-- <InputGroup
              v-model="entityForm.entityId"
              :error="entityForm.entityIdError"
              type="text"
              :placeholder="$t('Insert taxId')"
              prependIcon="heroicons-outline:document-text"
              merged
            /> -->

            <InputGroup
              v-model="entityForm.description"
              :error="entityForm.descriptionError"
              type="text"
              :placeholder="$t('Insert description')"
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
    </Modal>
  </div>
</template>

<script setup lang="ts">
import Modal from "@/components/Modal/ModalC.vue";
import InputGroup from "@/components/InputGroup/index.vue";
import { onMounted, ref } from "vue";
import Button from "@/components/Button/index.vue";
import { UseForm } from "../composables/useForm";
import { CreateRoleDto } from "@/api";
import { useCRUD } from "../composables/useCRUD";

defineProps({});

const emit = defineEmits(["refetch"]);
const openModal = ref(false);
const { handleSubmit, resetForm, ...fields } = UseForm();
const { createItem, isPending } = useCRUD(async (params) => {
  emit("refetch");
});
const entityForm = ref(fields);

const open = () => {
  openModal.value = true;
};

const close = () => {
  openModal.value = false;
};

const onSubmit = handleSubmit(async () => {
  const data: CreateRoleDto = {
    name: `${entityForm.value.name}`.trim(),
    departmentId: `${entityForm.value.departmentId}`,
    description: entityForm.value.description
      ? `${entityForm.value.description}`
      : null,
  };

  await createItem(data);
  resetForm();
  close();
});

onMounted(() => {});
</script>
