<template>
  <div class="space-y-5">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div>
        <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">Roles & Permissions</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          View and manage system roles and their permissions
        </p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="rolesStore.isLoading" class="flex justify-center items-center py-12">
      <div class="text-center">
        <svg
          class="animate-spin h-10 w-10 text-primary-500 mx-auto mb-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p class="text-slate-500 dark:text-slate-400">Loading roles...</p>
      </div>
    </div>

    <!-- Roles Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
      <div
        v-for="role in rolesStore.rolesList"
        :key="role.id"
        class="card hover:shadow-lg transition-shadow duration-200 cursor-pointer"
        @click="viewRoleDetails(role)"
      >
        <div class="card-body p-6">
          <!-- Role Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3">
              <div
                class="h-12 w-12 rounded-lg flex items-center justify-center"
                :class="`bg-${role.color}-500/10`"
              >
                <Icon :icon="role.icon" :class="`text-2xl text-${role.color}-500`" />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
                  {{ role.name }}
                </h3>
                <span
                  class="badge mt-1"
                  :class="`bg-${role.color}-500 text-white`"
                >
                  {{ role.id }}
                </span>
              </div>
            </div>
          </div>

          <!-- Role Description -->
          <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">
            {{ role.description }}
          </p>

          <!-- Permissions Count -->
          <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
            <div class="flex items-center gap-2">
              <Icon icon="heroicons-outline:shield-check" class="text-slate-400" />
              <span class="text-sm text-slate-600 dark:text-slate-400">
                {{ role.permissions.length }} Permissions
              </span>
            </div>
            <button
              @click.stop="viewRoleDetails(role)"
              class="text-sm text-primary-500 hover:text-primary-600 font-medium"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Role Details Modal -->
    <FormModal
      :is-open="showDetailsModal"
      :title="`${selectedRole?.name} Role Details`"
      @close="closeDetailsModal"
      :show-footer="false"
      size-class="max-w-3xl"
    >
      <div v-if="selectedRole" class="space-y-6">
        <!-- Role Info -->
        <div class="flex items-start gap-4">
          <div
            class="h-16 w-16 rounded-lg flex items-center justify-center flex-shrink-0"
            :class="`bg-${selectedRole.color}-500/10`"
          >
            <Icon :icon="selectedRole.icon" :class="`text-3xl text-${selectedRole.color}-500`" />
          </div>
          <div class="flex-1">
            <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              {{ selectedRole.name }}
            </h3>
            <p class="text-slate-600 dark:text-slate-400">
              {{ selectedRole.description }}
            </p>
            <div class="mt-2">
              <span
                class="badge"
                :class="`bg-${selectedRole.color}-500 text-white`"
              >
                Role ID: {{ selectedRole.id }}
              </span>
            </div>
          </div>
        </div>

        <!-- Permissions List -->
        <div>
          <h4 class="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <Icon icon="heroicons-outline:shield-check" />
            Permissions ({{ selectedRole.permissions.length }})
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div
              v-for="permission in selectedRole.permissions"
              :key="permission"
              class="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
            >
              <Icon
                icon="heroicons-outline:check-circle"
                class="text-success-500 flex-shrink-0"
              />
              <span class="text-sm text-slate-700 dark:text-slate-300">
                {{ formatPermission(permission) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Users with this Role -->
        <div>
          <h4 class="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <Icon icon="heroicons-outline:users" />
            Users with this Role
          </h4>
          <div v-if="getUsersByRole(selectedRole.id).length > 0" class="space-y-2">
            <div
              v-for="user in getUsersByRole(selectedRole.id)"
              :key="user.id"
              class="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
            >
              <div
                class="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold flex-shrink-0"
              >
                {{ getUserInitials(user) }}
              </div>
              <div class="flex-1">
                <div class="font-medium text-slate-900 dark:text-white">
                  {{ user.email }}
                </div>
                <div class="text-xs text-slate-500 dark:text-slate-400">
                  @{{ user.username }}
                </div>
              </div>
              <span
                class="badge"
                :class="user.isActive ? 'bg-success-500 text-white' : 'bg-slate-400 text-white'"
              >
                {{ user.isActive ? 'Active' : 'Inactive' }}
              </span>
            </div>
          </div>
          <div v-else class="text-center py-8">
            <Icon
              icon="heroicons-outline:users"
              class="text-4xl text-slate-300 dark:text-slate-600 mx-auto mb-2"
            />
            <p class="text-slate-500 dark:text-slate-400">
              No users assigned to this role yet
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
          <button
            @click="closeDetailsModal"
            class="btn bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600"
          >
            Close
          </button>
        </div>
      </div>
    </FormModal>

    <!-- Info Card -->
    <div class="card">
      <div class="card-body p-6">
        <div class="flex items-start gap-4">
          <div class="h-12 w-12 rounded-lg bg-info-500/10 flex items-center justify-center flex-shrink-0">
            <Icon icon="heroicons-outline:information-circle" class="text-2xl text-info-500" />
          </div>
          <div class="flex-1">
            <h3 class="font-semibold text-slate-900 dark:text-white mb-2">
              About Roles & Permissions
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-400">
              Roles define the access levels and permissions for users in the system. Each role has
              a specific set of permissions that determine what actions users with that role can perform.
              Assign roles to users in the User Management section to control their access.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRolesStore } from '@/store/roles'
import { useGetAllUsersQuery } from '@/modules/users/composables/useGetAllUsersQuery';
import { UserRoleService } from '@/services/UserRoleService';

const rolesStore = useRolesStore()
const { users: allUsers, isLoading: usersLoading } = useGetAllUsersQuery();

// State
const showDetailsModal = ref(false)
const selectedRole = ref(null)

// Methods
const viewRoleDetails = (role) => {
  selectedRole.value = role
  showDetailsModal.value = true
}

const closeDetailsModal = () => {
  showDetailsModal.value = false
  selectedRole.value = null
}

const formatPermission = (permission) => {
  // Convert "users.create" to "Users - Create"
  const parts = permission.split('.')
  if (parts.length === 2) {
    const [resource, action] = parts
    return `${capitalize(resource)} - ${capitalize(action)}`
  }
  return capitalize(permission)
}

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const getUserInitials = (user) => {
  if (user.username) {
    return user.username.substring(0, 2).toUpperCase()
  }
  if (user.email) {
    return user.email.substring(0, 2).toUpperCase()
  }
  return 'U'
}

const getUsersByRole = (roleId) => {
  const userRoles = UserRoleService.getUserRoles();
  const userIdsWithRole = Object.entries(userRoles)
    .filter(([_, rId]) => rId === roleId)
    .map(([userId, _]) => userId);

  if (!allUsers.value) {
    return [];
  }
  return allUsers.value.filter(user => userIdsWithRole.includes(user.id));
}

// Lifecycle
onMounted(async () => {
  await rolesStore.fetchRoles()
})
</script>

<style scoped>
.btn {
  @apply px-4 py-2 rounded-md font-medium transition-colors duration-200;
}
</style>
