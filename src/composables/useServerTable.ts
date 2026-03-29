// composables/useServerTable.js
import { ref, computed } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { number } from "yup";
import { useToast } from "vue-toastification";

const toast = useToast();

export function useServerTable(
  fetchFunction,
  initialOptions = {
    initialPage: 0,
    initialPerPage: 10,
    initialSort: { field: "createdAt", type: "desc" },
    initialSearch: "",
  }
) {
  const {
    initialPage = 1,
    initialPerPage = 10,
    initialSort = { field: "createdAt", type: "desc" },
    initialSearch = "",
  } = initialOptions;

  // Estado
  const page = ref(initialPage);
  const perPage = ref(initialPerPage);
  const sortBy = ref(initialSort);
  const searchTerm = ref(initialSearch);
  const items = ref([]);
  const total = ref(0);
  const loading = ref(false);

  // Computed
  const totalPages = computed(() => {
    return Math.ceil(total.value / perPage.value);
  });

  // Métodos
  const loadData = async () => {
    loading.value = true;
    try {
      const params = {
        offset: (page.value - 1) * perPage.value,
        limit: perPage.value,
        search: searchTerm.value,
        sortField: sortBy.value.field,
        sortOrder: sortBy.value.type === "desc" ? "desc" : "asc",
      };

      const response = await fetchFunction(params);
      items.value = response.data || [];
      total.value = response.total || 0;
    } catch (error) {
      console.error("Error loading table data:", error);
      items.value = [];
      total.value = 0;
      toast.error(`${error}`);
    } finally {
      loading.value = false;
    }
  };

  // Debounce para busca
  const debouncedSearch = useDebounceFn(() => {
    page.value = 1;
    loadData();
  }, 500);

  const onSearch = (value) => {
    searchTerm.value = value;
    debouncedSearch();
  };

  const onPageChange = (newPage) => {
    page.value = newPage;
    loadData();
  };

  const onPerPageChange = (newPerPage) => {
    perPage.value = newPerPage;
    page.value = 1;
    loadData();
  };

  const onSortChange = (newSort) => {
    sortBy.value = newSort;
    loadData();
  };

  const reset = () => {
    page.value = initialPage;
    perPage.value = initialPerPage;
    sortBy.value = initialSort;
    searchTerm.value = initialSearch;
    loadData();
  };

  // Carrega dados inicialmente
  loadData();

  return {
    // Estado
    page,
    perPage,
    sortBy,
    searchTerm,
    items,
    total,
    loading,

    // Computed
    totalPages,

    // Métodos
    loadData,
    onSearch,
    onPageChange,
    onPerPageChange,
    onSortChange,
    reset,
  };
}
