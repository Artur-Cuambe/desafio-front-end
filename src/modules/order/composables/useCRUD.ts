// composables/useEntityCRUD.js
import { ref, computed } from "vue";
import { useToast } from "vue-toastification";
import { CreateOrderDto, OrderService, UpdateOrderDto } from "@/api";

const toast = useToast();

export function useCRUD(fetchFunction: Function) {
  // Estado

  const selectedItems = ref([]);
  const editingItem = ref(null);
  const isEditing = ref(false);
  const isDeleting = ref(false);
  const isPending = ref(false);

  const hasSelectedItems = computed(() => {
    return selectedItems.value.length > 0;
  });

  // Métodos de CRUD

  // CREATE - Criar nova entidade
  const createItem = async (itemData: CreateOrderDto) => {
    try {
      isPending.value = true;
      const response = await OrderService.orderControllerCreate(itemData);
      toast.success("Pedido criada com sucesso!");
      return response;
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error(`Erro ao criar pedido: ${error.message}`);
      throw error;
    } finally {
      await fetchFunction();
      isPending.value = false;
    }
  };

  // UPDATE - Atualizar entidade
  const updateItem = async (id: number, itemData: UpdateOrderDto) => {
    try {
      isPending.value = true;
      const response = await OrderService.orderControllerUpdate(id, itemData);
      toast.success("Pedido atualizada com sucesso!");
      return response;
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error(`Erro ao atualizar pedido: ${error.message}`);
      throw error;
    } finally {
      await fetchFunction();
      isPending.value = false;
    }
  };

  // DELETE - Excluir uma entidade
  const deleteItem = async (id: number) => {
    isDeleting.value = true;
    isPending.value = true;
    try {
      await OrderService.orderControllerRemove(id);
      toast.success("Pedido excluída com sucesso!");

      return true;
    } catch (error) {
      toast.error(`Erro ao excluir pedido: ${error.message}`);
      throw error;
    } finally {
      await fetchFunction();
      isDeleting.value = false;
      isPending.value = false;
    }
  };

  // DELETE MÚLTIPLO - Excluir várias entidades
  const deleteMultipleItems = async (ids) => {
    isDeleting.value = true;
    isPending.value = true;
    try {
      const deletePromises = ids.map((id) =>
        OrderService.orderControllerRemove(id)
      );
      await Promise.all(deletePromises);

      toast.success(`${ids.length} pedido(s) excluído(s) com sucesso!`);

      return true;
    } catch (individualError) {
      console.error("Error deleting order individually:", individualError);
      toast.error(`Erro ao excluir pedido: ${individualError.message}`);
      throw individualError;
    } finally {
      await fetchFunction();
      isDeleting.value = false;
      isPending.value = false;
    }
  };

  // Métodos de seleção
  const toggleItemSelection = (item) => {
    const index = selectedItems.value.findIndex(
      (selected) => selected.id === item.id
    );
    if (index === -1) {
      selectedItems.value.push(item);
    } else {
      selectedItems.value.splice(index, 1);
    }
  };

  const selectAllOnPage = (items) => {
    selectedItems.value = [...items.value];
  };

  const clearSelection = () => {
    selectedItems.value = [];
  };

  const isItemSelected = (item) => {
    return selectedItems.value.some((selected) => selected.id === item.id);
  };

  // Métodos de edição
  const startEditing = (item) => {
    editingItem.value = { ...item };
    isEditing.value = true;
  };

  const cancelEditing = () => {
    editingItem.value = null;
    isEditing.value = false;
  };

  const saveItem = async () => {
    if (!editingItem.value || !editingItem.value.id) {
      toast.error("Nenhum item selecionado para edição");
      return;
    }

    try {
      const { id, ...data } = editingItem.value;
      if (id) {
        await updateItem(id, data);
      }
      if (!id) {
        await createItem(data);
      }
      editingItem.value = null;
      isEditing.value = false;
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  // Carrega dados inicialmente
  //   loadData();

  return {
    // Estado

    selectedItems,
    editingItem,
    isEditing,
    isDeleting,
    isPending,

    // Computed
    hasSelectedItems,

    // Métodos CRUD

    createItem,
    updateItem,
    deleteItem,
    deleteMultipleItems,

    // Métodos de seleção
    toggleItemSelection,
    selectAllOnPage,
    clearSelection,
    isItemSelected,

    // Métodos de edição
    startEditing,
    cancelEditing,
    saveItem,
  };
}
