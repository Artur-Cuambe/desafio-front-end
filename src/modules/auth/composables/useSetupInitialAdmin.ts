// composables/auth/useSetupInitialAdmin.ts
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { computed } from "vue";
import { api } from "@/plugins/axios";
import { useToast } from "vue-toastification";

interface SetupResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
}

/**
 * Composable for setting up the initial admin user
 *
 * Provides a mutation function to create the first admin user in the system.
 * On success, invalidates relevant queries and shows success notification.
 * On error, shows error notification with the error message.
 *
 * @returns {Object} Object containing:
 *   - setupAdmin: Mutation function to setup admin
 *   - isLoading: Loading state (isPending)
 *   - error: Error state
 *   - isSuccess: Success state
 */
export function useSetupInitialAdmin() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: async (): Promise<SetupResponse> => {
      // The backend uses the authenticated user's info from the JWT,
      // so we send an empty post request.
      const response = await api.post("/auth/setup-initial-admin");
      return response.data;
    },
    retry: 1,
    onSuccess: (data) => {
      // Show success toast
      toast.success(
        data.message || "Initial admin user created successfully! You are now an administrator.",
        {
          timeout: 5000,
        }
      );

      // Invalidate relevant queries to refresh the UI
      queryClient.invalidateQueries({ queryKey: ["auth", "admin-setup-status"] });
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });

      // Reload page after 2 seconds to ensure fresh state
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
    onError: (error: any) => {
      // Extract error message from response
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to setup initial admin. Please try again.";

      // Show error toast
      toast.error(errorMessage, {
        timeout: 5000,
      });

      console.error("Setup initial admin error:", error);
    },
  });

  return {
    setupAdmin: mutation.mutate,
    isLoading: computed(() => mutation.isPending),
    error: computed(() => mutation.error),
    isSuccess: computed(() => mutation.isSuccess),
  };
}
