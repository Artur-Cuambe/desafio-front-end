<template>
  <div class="">
    <DialogModal>
      <template #title>
        <div class="px-6 pt-6 bg-white dark:bg-slate-800 rounded-lg">
          {{ $t("Cliente") }}
        </div></template
      >
      <template #body>
        <div class="px-6 pt-0 bg-white dark:bg-slate-800 rounded-lg">
          <!-- <pre>{{ selectedEntity }}</pre> -->
          <div class="flex flex-col gap-6 dark:text-gray-100">
            <form @submit.prevent="onSubmit" class="space-y-4">
              <InputGroup
                v-model.trim="entityForm.firstName"
                :error="entityForm.firstNameError"
                :disabled="viewForm"
                type="text"
                :placeholder="$t('Nome')"
                prependIcon="heroicons-outline:office-building"
                merged
              />

              <InputGroup
                v-model.trim="entityForm.lastName"
                :error="entityForm.lastNameError"
                type="text"
                :disabled="viewForm"
                :placeholder="$t('Apelido')"
                prependIcon="heroicons-outline:office-building"
                merged
              />

              <InputGroup
                v-model.trim="entityForm.phoneNumber"
                :error="entityForm.phoneNumberError"
                type="text"
                :disabled="viewForm"
                :placeholder="$t('Telefone')"
                prependIcon="heroicons-outline:document-text"
                merged
              />

              <vSelect
                class="dark:text-black-500 dark:bg-black-300"
                v-model="entityForm.gender"
                :reduce="(per) => per.value"
                :options="genderData"
                :disabled="viewForm"
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
                  v-if="!viewForm"
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
import { UpdateCustomerDto } from "@/api";
import { useCRUD } from "../composables/useCRUD";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { computed } from "vue";

const { selectedEntity, viewForm } = defineProps({
  selectedEntity: Object,
  viewForm: Boolean,
});

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
  const data: UpdateCustomerDto = {
    firstName: `${entityForm.value.firstName}`.trim(),
    entityId: parseInt(`${entityForm.value.entityId}`),
    lastName: `${entityForm.value.lastName}`,
    gender: `${entityForm.value.gender}`,
    phoneNumber: `${entityForm.value.phoneNumber}`,
  };
  editingItem.value = { ...data, id: selectedEntity.id };
  await saveItem();
  close();
});

onMounted(() => {
  if (selectedEntity && selectedEntity.id) {
    entityForm.value.firstName = selectedEntity.firstName;
    entityForm.value.lastName = selectedEntity.lastName;
    entityForm.value.entityId = selectedEntity.entityId;
    entityForm.value.gender = selectedEntity.gender;
    entityForm.value.phoneNumber = selectedEntity.phoneNumber;
  }
});
</script>
