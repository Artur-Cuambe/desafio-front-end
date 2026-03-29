import { useQuery } from "@tanstack/vue-query";
// import { getLoggedUser } from "@/modules/auth/api/getLoggedUser";
import { AuthenticationService } from "@/api";

// Função para obter dados de placeholder armazenados no localStorage
const getStoredPlaceholderData = () => {
  const storedData = JSON.parse(
    localStorage.getItem("loggedUserPlaceholder") || JSON.stringify(null)
  );
  return storedData || undefined;
};

// Função para armazenar dados de placeholder no localStorage
const setStoredPlaceholderData = (data: any) => {
  localStorage.setItem("loggedUserPlaceholder", JSON.stringify(data));
};

export const useGetLoggedUser = () => {
  const queryFn = async () => {
    const data = await AuthenticationService.authControllerGetProfile();
    setStoredPlaceholderData(data);
    return data;
  };

  // Obtém dados de placeholder do localStorage
  const placeholderData = localStorage.getItem("loggedUserPlaceholder")
    ? getStoredPlaceholderData()
    : undefined;

  const { data, isLoading } = useQuery({
    queryFn,
    queryKey: ["logged-user"],
    retry: 2,
    staleTime: 1000 * 60 * 60,
    placeholderData,
  });

  return {
    data,
    isLoading,
  };
};
