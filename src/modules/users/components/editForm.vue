<template>
  <div class="">
    <DialogModal>
      <template #title>
        <div class="px-6 pt-6 bg-white dark:bg-slate-800 rounded-lg">
          {{ $t("user") }}
        </div></template
      >
      <template #body>
        <div class="px-6 pt-0 bg-white dark:bg-slate-800 rounded-lg">
          <div class="flex flex-col gap-6 dark:text-gray-100">
            <form @submit.prevent="onSubmit" class="space-y-4">
              <InputGroup
                v-model.trim="entityForm.username"
                :error="entityForm.usernameError"
                type="text"
                :placeholder="$t('Insert username')"
                prependIcon="heroicons-outline:office-building"
                merged
              />

              <InputGroup
                v-model.trim="entityForm.email"
                :error="entityForm.emailError"
                type="text"
                :placeholder="$t('Insert email')"
                prependIcon="heroicons-outline:document-text"
                merged
              />

              <InputGroup
                v-model="entityForm.entityId"
                :error="entityForm.entityIdError"
                type="text"
                :placeholder="$t('Insert entity')"
                prependIcon="heroicons-outline:document-text"
                merged
              />

              <InputGroup
                v-model="entityForm.roleId"
                :error="entityForm.roleIdError"
                type="text"
                :placeholder="$t('Insert role')"
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
import { onMounted, ref, defineProps } from "vue";
import Button from "@/components/Button/index.vue";
import { UseForm } from "../composables/useForm";
import {  UpdateUserDto } from "@/api";
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
  const data: UpdateUserDto = {
    username: `${entityForm.value.username}`.trim(),
    email: `${entityForm.value.email}`.trim(),
    roleId: `${entityForm.value.roleId}`,
    entityId: `${entityForm.value.entityId}`,
  };
  editingItem.value = { ...data, id: selectedEntity.id };
  await saveItem();
  close();
});

onMounted(() => {
  if (selectedEntity && selectedEntity.id) {
    entityForm.value.username = selectedEntity.username;
    entityForm.value.email = selectedEntity.email;
    entityForm.value.roleId = selectedEntity.roleId;
    entityForm.value.entityId = selectedEntity.entityId;
  }
});
</script>
