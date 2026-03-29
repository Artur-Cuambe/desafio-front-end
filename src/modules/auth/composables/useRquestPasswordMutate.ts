// composables/auth/useLoginMutate.ts
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { PasswordResetService, RequestPasswordResetDto } from "@/api";

export function useRquestPasswordMutate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestPasswordResetDto: RequestPasswordResetDto) =>
      PasswordResetService.passwordResetControllerRequestPasswordReset(
        requestPasswordResetDto
      ),
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
