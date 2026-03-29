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
          {{ $t("Cliente") }}
        </h3>

        <div class="flex flex-col gap-6 dark:text-gray-100">
          <form @submit.prevent="onSubmit" class="space-y-4">
            <InputGroup
              v-model.trim="entityForm.firstName"
              :error="entityForm.firstNameError"
              type="text"
              :placeholder="$t('Nome')"
              prependIcon="heroicons-outline:office-building"
              merged
            />

            <InputGroup
              v-model.trim="entityForm.lastName"
              :error="entityForm.lastNameError"
              type="text"
              :placeholder="$t('Apelido')"
              prependIcon="heroicons-outline:office-building"
              merged
            />

            <InputGroup
              v-model.trim="entityForm.phoneNumber"
              :error="entityForm.phoneNumberError"
              type="text"
              :placeholder="$t('Telefone')"
              prependIcon="heroicons-outline:document-text"
              merged
            />
            <vSelect
              class="dark:text-black-500 dark:bg-black-300"
              v-model="entityForm.gender"
              :reduce="(per) => per.value"
              :options="genderData"
              :error="entityForm.genderError"
            >
            </vSelect>

            <InputGroup
              hidden
              v-model="entityForm.entityId"
              :error="entityForm.entityIdError"
              type="text"
              :placeholder="$t('Insert entity')"
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
import { CreateCustomerDto } from "@/api";
import { useCRUD } from "../composables/useCRUD";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { computed } from "vue";

defineProps({});

const emit = defineEmits(["refetch"]);
const openModal = ref(false);
const { handleSubmit, resetForm, ...fields } = UseForm();
const { createItem, isPending, editingItem } = useCRUD(async (params) => {
  emit("refetch");
});
const entityForm = ref(fields);

const open = () => {
  openModal.value = true;
};

const close = () => {
  openModal.value = false;
};

const gender = [
  { label: "Masculino", value: "MALE" },
  { label: "Feminino", value: "FEMALE" },
];

const genderData = computed(() => {
  return gender?.map((item) => {
    return {
      ...item,
    };
  });
});

const onSubmit = handleSubmit(async () => {
  const data: CreateCustomerDto = {
    firstName: `${entityForm.value.firstName}`.trim(),
    entityId: parseInt(`${entityForm.value.entityId}`),
    lastName: `${entityForm.value.lastName}`,
    gender: `${entityForm.value.gender}`,
    phoneNumber: `${entityForm.value.phoneNumber}`,
  };

  await createItem(data);
  resetForm();
  close();
});

onMounted(() => {});
</script>
