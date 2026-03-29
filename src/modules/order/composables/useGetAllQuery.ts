import { OrderService } from "@/api";
import { useServerTable } from "@/composables/useServerTable";

export const useGetAllQuery = () => {
  const table = useServerTable(
    async (params) => {
      const response = await OrderService.orderControllerFindAll(
        params.offset,
        params.limit,
        params.search,
        params.sortField,
        params.sortOrder
      );
      return response;
    },
    {
      initialPage: 1,
      initialPerPage: 10,
      initialSort: { field: "createdAt", type: "desc" },
      initialSearch: "",
    }
  );

  return {
    ...table,
  };
};
