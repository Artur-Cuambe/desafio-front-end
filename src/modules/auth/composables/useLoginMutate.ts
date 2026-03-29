// composables/auth/useLoginMutate.ts
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { AuthenticationService, LoginDto } from "@/api";

export function useLoginMutate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (loginData: LoginDto) => AuthenticationService.authControllerLogin(loginData),
    retry: 2,
    onSuccess: (data) => {
      console.log({data});
      
      // Armazenar tokens no localStorage
      // if (data.accessToken && data.refreshToken) {
      //   localStorage.setItem("accessToken", data.accessToken);
      //   localStorage.setItem("refreshToken", data.refreshToken);
      // }

      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: (error: any) => {
      console.error("Login error:", error);
    },
  });
}
