// composables/auth/useLoginMutate.ts
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { AuthenticationService, ChangePasswordDto, RegisterDto } from "@/api";

export function useRegistMutate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (registerDto: RegisterDto) =>
      AuthenticationService.authControllerRegister(registerDto),
    retry: 2,
    onSuccess: (data) => {
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
