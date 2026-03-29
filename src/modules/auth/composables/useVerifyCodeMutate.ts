// composables/auth/useLoginMutate.ts
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { AuthenticationService, Verify2faDto } from "@/api";

export function useVerifyCodeMutate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (verify2faDto: Verify2faDto) =>
      AuthenticationService.authControllerVerify2Fa(verify2faDto),
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
