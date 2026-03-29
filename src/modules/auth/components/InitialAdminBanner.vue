<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="transform -translate-y-full opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-full opacity-0"
    >
      <div
        v-if="shouldShowBanner"
        class="fixed top-0 left-0 right-0 z-[9999] shadow-lg"
      >
        <div
          class="bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-700 dark:to-primary-600 text-white"
        >
          <div class="container mx-auto px-4 py-4">
            <div class="flex flex-col md:flex-row items-center justify-between gap-4">
              <div class="flex items-center gap-3 text-center md:text-left">
                <Icon
                  icon="heroicons-outline:shield-check"
                  class="text-3xl md:text-4xl flex-shrink-0"
                />
                <div>
                  <h3 class="text-lg md:text-xl font-bold mb-1">
                    Initial System Setup Required
                  </h3>
                  <p class="text-sm md:text-base text-primary-50 dark:text-primary-100">
                    No admin user exists yet. Set up your admin account to manage the system.
                  </p>
                </div>
              </div>
              <button
                @click="showConfirmModal = true"
                type="button"
                class="btn bg-white text-primary-600 hover:bg-primary-50 dark:bg-slate-800 dark:text-primary-400 dark:hover:bg-slate-700 font-semibold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap"
              >
                <Icon
                  icon="heroicons-outline:user-plus"
                  class="inline-block mr-2 text-lg"
                />
                Become Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Confirmation Modal -->
    <FormModal
      :is-open="showConfirmModal"
      title="Confirm Admin Setup"
      theme-class="bg-primary-600 dark:bg-primary-700"
      size-class="max-w-2xl"
      submit-text="Yes, Make Me Admin"
      :loading="isSettingUpAdmin"
      :close-on-backdrop="!isSettingUpAdmin"
      @close="handleCloseModal"
      @submit="handleConfirmSetup"
    >
      <div class="space-y-6">
        <!-- Warning Header -->
        <div
          class="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg"
        >
          <Icon
            icon="heroicons-outline:exclamation-triangle"
            class="text-2xl text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5"
          />
          <div>
            <h4 class="font-semibold text-amber-900 dark:text-amber-100 mb-1">
              Important Notice
            </h4>
            <p class="text-sm text-amber-800 dark:text-amber-200">
              This action will grant you full administrative privileges. This can only be done once
              during initial system setup.
            </p>
          </div>
        </div>

        <!-- Admin Privileges List -->
        <div>
          <h4 class="font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
            <Icon icon="heroicons-outline:key" class="text-xl text-primary-600 dark:text-primary-400" />
            Admin Privileges
          </h4>
          <ul class="space-y-2.5">
            <li
              v-for="(privilege, index) in adminPrivileges"
              :key="index"
              class="flex items-start gap-3 text-slate-700 dark:text-slate-300"
            >
              <Icon
                icon="heroicons-solid:check-circle"
                class="text-green-500 dark:text-green-400 text-lg flex-shrink-0 mt-0.5"
              />
              <span class="text-sm">{{ privilege }}</span>
            </li>
          </ul>
        </div>

        <!-- Confirmation Text -->
        <div
          class="p-4 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg"
        >
          <p class="text-sm text-slate-700 dark:text-slate-300">
            By clicking "Yes, Make Me Admin", you confirm that you want to become the system
            administrator. Your current user account will be upgraded to admin status.
          </p>
        </div>
      </div>
    </FormModal>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, watchEffect } from "vue";
import Icon from "@/components/Icon";
import FormModal from "@/components/Modal/FormModal.vue";
import { useAdminSetupStatus } from "../composables/useAdminSetupStatus";
import { useSetupInitialAdmin } from "../composables/useSetupInitialAdmin";

const props = defineProps({
  autoCheck: {
    type: Boolean,
    default: true,
  },
});

// Check if user is authenticated
const isAuthenticated = computed(() => {
  return !!localStorage.getItem('accessToken');
});

// Composables
const { setupAvailable, canSetup, isLoading, refetch, error } = useAdminSetupStatus();
const { setupAdmin, isLoading: isSettingUpAdmin } = useSetupInitialAdmin();

// Local state
const showConfirmModal = ref(false);

// Computed
const shouldShowBanner = computed(() => {
  // Only show if authenticated and setup is available
  return isAuthenticated.value && !isLoading.value && setupAvailable.value && canSetup.value;
});

// Admin privileges list
const adminPrivileges = [
  "Full access to all system features and settings",
  "Manage users, roles, and permissions",
  "Configure system-wide settings and preferences",
  "Access to audit logs and system reports",
  "Manage hotel, bar, and restaurant operations",
  "Override security restrictions when necessary",
];

watchEffect(() => {
  console.log("Banner Status Check:");
  console.log("  - isAuthenticated:", isAuthenticated.value);
  console.log("  - isLoading:", isLoading.value);
  console.log("  - setupAvailable:", setupAvailable.value);
  console.log("  - canSetup:", canSetup.value);
  console.log("  - shouldShowBanner:", shouldShowBanner.value);
  if (error.value) {
    console.error("  - Error:", error.value);
  }
});

// Methods
const handleCloseModal = () => {
  if (!isSettingUpAdmin.value) {
    showConfirmModal.value = false;
  }
};

const handleConfirmSetup = () => {
  // Call the setup mutation
  // Note: The backend will use the authenticated user's info
  // So we just need to trigger the endpoint
  setupAdmin(null, {
    onSuccess: () => {
      showConfirmModal.value = false;
    },
  });
};

// Lifecycle
onMounted(() => {
  if (props.autoCheck) {
    refetch();
  }
});
</script>

<style scoped>
/* Additional custom styles if needed */
.btn {
  @apply inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2;
}
</style>
