<template>
  <div>
    <div class="grid grid-cols-12 gap-0">
      <div class="col-span-12 lg:col-span-12">
        <div class="space-y-5">
          <!-- <pre>{{ isEditing }}</pre> -->
          <Table
            :isLoading="loading"
            :items="items"
            :isEditing="isEditing"
            @refetch="loadData"
            @onSearch="onSearch"
            @delete="removeItem"
            @deleteMany="removeItems"
            @startEditing="startEditing"
            @close="isEditing = !isEditing"
          >
            <Pagination
              :total="total"
              :current="page"
              :per-page="perPage"
              @page-changed="onPageChange"
            >
              >
            </Pagination>
          </Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Table from "../components/table.vue";
import Pagination from "@/components/Pagination/index.vue";
import { useGetAllQuery } from "../composables/useGetAllQuery";
import { useCRUD } from "../composables/useCRUD";

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

const { deleteItem, deleteMultipleItems, isEditing, startEditing } = useCRUD(
  async (params) => {
    loadData();
  }
);

const removeItem = (row) => {
  deleteItem(row[0].id);
};
const removeItems = (rows) => {
  const ids = rows.map((row) => row.id);
  deleteMultipleItems(ids);
};
</script>

<style lang="scss">
.vgt-inner-wrap {
  @apply shadow-none;
}
</style>
