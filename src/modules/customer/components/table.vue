<template>
  <div>
    <Card :title="$t('Clientes')" noborder>
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 mr-3">
            <Button
              v-if="selectedEntity.length > 0"
              @click="handleDeleteSelected"
              btnClass="btn-danger btn-sm"
              :text="$t('Delete selected')"
            >
              <div class="flex items-center gap-1">
                <Icon icon="heroicons:trash" class="text-lg" />
                <span
                  >{{ selectedEntity.length }} {{ t("Delete selected") }}</span
                >
              </div>
            </Button>
          </div>

          <addForm @refetch="emit('refetch')">
            <Button btnClass="btn-primary btn-sm">
              <div class="flex items-center gap-2">
                <Icon icon="heroicons-solid:plus" class="text-lg" />
                <span style="text-transform: none">Novo cliente</span>
              </div>
            </Button>
          </addForm>
        </div>
      </template>

      <div class="-mx-6" v-if="isLoading">
        <TableSkeleton />
      </div>

      <div v-else class="-mx-6">
        <!-- Painel de informações de seleção -->
        <div
          v-if="selectedEntity.length > 0"
          class="mb-4 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Button
                @click="selectAll"
                btnClass="btn-secondary btn-xs"
                :text="t('Select all')"
              >
                <span>{{ $t("Select all") }}</span>
              </Button>
              <Button
                @click="deselectAll"
                btnClass="btn-ghost btn-xs"
                :text="t('Deselect all')"
              >
                <span>{{ t("Deselect all") }}</span>
              </Button>
            </div>
            <div class="flex items-center ml-auto">
              <span class="font-medium"
                >{{ selectedEntity.length }} {{ t("rows selected") }}</span
              >
              <Button
                @click="clearSelection"
                btnClass="btn-ghost btn-xs"
                :text="t('clear')"
              >
                <Icon icon="heroicons:x-mark" class="text-sm" />
              </Button>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between m-6">
          <input
            type="text"
            v-model="searchTerm"
            placeholder="Procurar cliente..."
            class="bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-secondary-500 dark:focus:ring-secondary-400 border border-gray-300 dark:border-transparent"
            @input="emit('onSearch', searchTerm)"
          />
        </div>

        <!-- Tabela -->
         <div class="mx-6">
        <vue-good-table
          ref="tableRef"
          :columns="columns"
          :rows="items"
          v-model:selected-rows="selectedEntity"
          styleClass="vgt-table centered lesspadding2 table-head"
          :pagination-options="{
            enabled: true,
            perPage: perpage,
            perPageDropdown: [10, 20, 50, 100],
          }"
          :sort-options="{
            enabled: true,
          }"
          :select-options="{
            enabled: false,
            selectOnCheckboxOnly: false, // Permite clicar na linha também
            selectionInfoClass: 'hidden', // Oculta o painel padrão
            selectionText: t('rows selected'),
            clearSelectionText: t('clear'),
            disableSelectInfo: true, // Desabilita o painel padrão
            selectAllByGroup: false,
          }"
          mode="remote"
          @on-selected-rows-change="onSelectionChange"
          @on-row-click="onRowClick"
        >
          <!-- Coluna de checkbox -->
          <template #table-column="props">
            <span v-if="props.column.field === 'checkbox'">
              <input
                v-show="0"
                type="checkbox"
                :checked="isAllSelected"
                @change="toggleSelectAll"
                class="checkbox"
              />
            </span>
            <span v-else>
              {{ props.column.label }}
            </span>
          </template>

          <!-- Coluna de ações -->
          <template #table-row="props">
            <div
              v-if="props.column.field === 'actions'"
              class="flex items-center gap-2"
            >
              <Button
                @click="startEditing(props.row, true)"
                btnClass="btn-icon btn-outline-secondary btn-sm"
                :text="t('View')"
                :is-disabled="props.row.code == 'ADMIN'"
              >
                <Icon icon="heroicons:eye" />
              </Button>
              <Button
                @click="startEditing(props.row)"
                btnClass="btn-icon btn-outline-primary btn-sm"
                :text="t('Edit')"
                :is-disabled="props.row.code == 'ADMIN'"
              >
                <Icon icon="heroicons:pencil-square" />
              </Button>

              <Button
                @click="deleteRow(props.row)"
                btnClass="btn-icon btn-outline-danger btn-sm"
                :text="t('Delete')"
                :is-disabled="props.row.code == 'ADMIN'"
              >
                <Icon icon="heroicons:trash" />
              </Button>
            </div>
            <div v-if="props.column.field === 'gender'" class="">
              {{ $t(props.row.gender) }}
            </div>

            <!-- Checkbox na primeira coluna -->
            <div
              v-else-if="props.column.field === 'checkbox'"
              class="flex justify-center"
            >
              <input
                type="checkbox"
                :checked="isSelected(props.row)"
                @change="toggleRowSelection(props.row)"
                @click.stop
                class="checkbox"
              />
            </div>

            <!-- Outras colunas -->
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>

          <template #pagination-bottom="props">
            <div class="flex justify-center px-3 py-4">
              <slot></slot>
            </div>
          </template>
        </vue-good-table>
        </div>
      </div>
    </Card>
    <editForm
      @refetch="emit('refetch')"
      @clearSelection="clearSelection"
      :selectedEntity="selectedEntity[0]"
      :viewForm="viewForm"
      @close="emit('close')"
      v-if="props.isEditing"
    />
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, onMounted } from "vue";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import { useI18n } from "vue-i18n";
import TableSkeleton from "@/components/Skeleton/Table.vue";
import addForm from "./addForm.vue";
import editForm from "./editForm.vue";
import { formateDatePT } from "@/utils/formatters";

const props = defineProps({
  items: Array,
  isLoading: Boolean,
  totalItems: Number,
  isEditing: Boolean,
});

const emit = defineEmits([
  "refetch",
  "selection-change",
  "page-change",
  "edit",
  "delete",
  "deleteMany",
  "onSearch",
  "startEditing",
]);

const { t } = useI18n();
const tableRef = ref(null);
const selectedEntity = ref([]);
const isMobile = ref(false);
const viewForm = ref(false);
const openEditForm = ref(false);
const perpage = ref(10);
const searchTerm = ref("");

// Configuração das colunas com checkbox
const columns = ref([
  {
    label: "", // Checkbox column
    field: "checkbox",
    width: "50px",
    sortable: false,
  },
  {
    label: "Nome",
    field: "firstName",
    sortable: true,
  },

  {
    label: t("Gênero"),
    field: "gender",
  },
  {
    label: t("Telefone"),
    field: "phoneNumber",
    sortable: true,
  },
  {
    label: t("Acções"),
    field: "actions",
    sortable: false,
    width: "120px",
  },
]);

// Computed para verificar se todas as linhas estão selecionadas
const isAllSelected = computed(() => {
  if (!props.items || props.items.length === 0) return false;
  return selectedEntity.value.length === props.items.length;
});

// Métodos
const onSelectionChange = (params) => {
  selectedEntity.value = params.selectedRows;
  emit("selection-change", selectedEntity.value);
};

const onRowClick = (params) => {
  // Se não for checkboxOnly, permite selecionar clicando na linha
  if (!params.column.field === "checkbox") {
    toggleRowSelection(params.row);
  }
};

const toggleRowSelection = (row) => {
  const index = selectedEntity.value.findIndex(
    (selectedRow) => selectedRow.id === row.id,
  );

  if (index === -1) {
    selectedEntity.value.push(row);
  } else {
    selectedEntity.value.splice(index, 1);
  }
};

const isSelected = (row) => {
  return selectedEntity.value.some((selectedRow) => selectedRow.id === row.id);
};

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedEntity.value = [];
  } else {
    selectedEntity.value = [...props.items];
  }
};

const selectAll = () => {
  selectedEntity.value = [...props.items];
};

const deselectAll = () => {
  selectedEntity.value = [];
};

const clearSelection = () => {
  selectedEntity.value = [];
};

const handleDeleteSelected = () => {
  if (selectedEntity.value.length === 0) return;

  const confirmDelete = confirm(
    `Deseja realmente excluir item(ns) selecionado(s)?`,
  );

  if (confirmDelete) {
    emit("deleteMany", selectedEntity.value);
    selectedEntity.value = [];
  }
};

const startEditing = (row, view = false) => {
  viewForm.value = view;
  selectedEntity.value[0] = row;
  emit("startEditing", row);
};

const deleteRow = (row) => {
  const confirmDelete = confirm(`Deseja realmente excluir "${row.name}"?`);
  if (confirmDelete) {
    emit("delete", [row]);
  }
};

// Detecção de dispositivo
const checkDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (
    /android/i.test(userAgent) ||
    (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
  ) {
    isMobile.value = true;
  } else {
    isMobile.value = false;
  }
};

onMounted(() => {
  checkDevice();
});
</script>

<style lang="scss" scoped>
.checkbox {
  @apply w-4 h-4 text-primary-500 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600;
}

.action-btn {
  @apply h-6 w-6 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 rounded;
}

:deep(.vgt-checkbox-col) {
  width: 50px;
}

:deep(.vgt-table) {
  .selected {
    @apply bg-primary-50 dark:bg-primary-900/20;
  }
}
</style>
