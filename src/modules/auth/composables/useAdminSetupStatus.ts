// composables/auth/useAdminSetupStatus.ts
import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";
import { api } from "@/plugins/axios";

interface AdminSetupStatus {
  setupAvailable: boolean;
  canSetup: boolean;
  hasAdminUser: boolean;
  currentUserCanSetup?: boolean;
}

/**
 * Composable to check the admin setup status
 *
 * Queries the backend to determine if initial admin setup is available
 * and if the current user (if logged in) can perform the setup.
 *
 * @returns {Object} Object containing:
 *   - setupStatus: The setup status data
 *   - setupAvailable: Computed boolean indicating if setup is available
 *   - canSetup: Computed boolean indicating if current user can setup
 *   - isLoading: Loading state
 *   - error: Error state
 *   - refetch: Function to manually refetch the status
 */
export function useAdminSetupStatus() {
  // Check if user is authenticated before making the request
  const isAuthenticated = computed(() => {
    return !!localStorage.getItem('accessToken');
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["auth", "admin-setup-status"],
    queryFn: async (): Promise<AdminSetupStatus> => {
      const response = await api.get("/auth/admin-setup-status");
      return response.data;
    },
    staleTime: 30 * 1000, // 30 seconds
    retry: false, // Don't retry 401 errors
    refetchOnWindowFocus: true,
    enabled: isAuthenticated, // Only fetch when authenticated
  });

  const setupStatus = computed(() => data.value);

  const setupAvailable = computed(() => {
    return data.value?.setupAvailable ?? false;
  });

  const canSetup = computed(() => {
    return data.value?.canSetup ?? false;
  });

  return {
    setupStatus,
    setupAvailable,
    canSetup,
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    refetch,
  };
}
