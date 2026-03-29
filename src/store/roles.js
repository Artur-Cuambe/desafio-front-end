import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useRolesStore = defineStore('roles', () => {
  // State
  const roles = ref([
    {
      id: 'admin',
      name: 'Admin',
      description: 'Full system access with all permissions',
      permissions: [
        'users.create',
        'users.read',
        'users.update',
        'users.delete',
        'roles.read',
        'roles.manage',
        'reservations.manage',
        'inventory.manage',
        'reports.view',
        'settings.manage'
      ],
      color: 'danger',
      icon: 'heroicons-outline:shield-check'
    },
    {
      id: 'manager',
      name: 'Manager',
      description: 'Manage operations and staff',
      permissions: [
        'users.read',
        'users.update',
        'reservations.manage',
        'inventory.manage',
        'reports.view'
      ],
      color: 'warning',
      icon: 'heroicons-outline:briefcase'
    },
    {
      id: 'staff',
      name: 'Staff',
      description: 'Basic operational access',
      permissions: [
        'reservations.read',
        'reservations.create',
        'inventory.read'
      ],
      color: 'info',
      icon: 'heroicons-outline:user-group'
    },
    {
      id: 'user',
      name: 'User',
      description: 'Standard user with limited access',
      permissions: [
        'profile.read',
        'profile.update',
        'reservations.read'
      ],
      color: 'success',
      icon: 'heroicons-outline:user'
    }
  ])
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const rolesList = computed(() => roles.value)
  const isLoading = computed(() => loading.value)
  const hasError = computed(() => error.value !== null)

  const getRoleById = computed(() => {
    return (id) => roles.value.find(role => role.id === id)
  })

  const getRoleByName = computed(() => {
    return (name) => roles.value.find(role =>
      role.name.toLowerCase() === name.toLowerCase()
    )
  })

  const getRoleColor = computed(() => {
    return (roleName) => {
      const role = roles.value.find(r =>
        r.name.toLowerCase() === roleName.toLowerCase()
      )
      return role ? role.color : 'secondary'
    }
  })

  // Actions
  async function fetchRoles() {
    loading.value = true
    error.value = null
    try {
      // For now, roles are hardcoded
      // In the future, this can be replaced with an API call
      // const response = await RolesService.rolesControllerFindAll()
      // roles.value = response
      return roles.value
    } catch (err) {
      error.value = err.message || 'Failed to fetch roles'
      toast.error('Failed to load roles')
      throw err
    } finally {
      loading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  return {
    // State
    roles,
    loading,
    error,

    // Getters
    rolesList,
    isLoading,
    hasError,
    getRoleById,
    getRoleByName,
    getRoleColor,

    // Actions
    fetchRoles,
    clearError
  }
})
