/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AssignPermissionDto } from '../models/AssignPermissionDto';
import type { BulkAssignPermissionsDto } from '../models/BulkAssignPermissionsDto';
import type { CreatePermissionDto } from '../models/CreatePermissionDto';
import type { CreateRoleDto } from '../models/CreateRoleDto';
import type { PermissionResponseDto } from '../models/PermissionResponseDto';
import type { RoleResponseDto } from '../models/RoleResponseDto';
import type { RoleResponsePaginateDto } from '../models/RoleResponsePaginateDto';
import type { RoleWithPermissionsDto } from '../models/RoleWithPermissionsDto';
import type { UpdatePermissionDto } from '../models/UpdatePermissionDto';
import type { UpdateRoleDto } from '../models/UpdateRoleDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RolesPermissionsService {
    /**
     * Create a new role
     * @param requestBody
     * @returns RoleResponseDto Role created successfully
     * @throws ApiError
     */
    public static rolesControllerCreateRole(
        requestBody: CreateRoleDto,
    ): CancelablePromise<RoleResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/roles',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Department not found`,
                409: `Role already exists`,
            },
        });
    }
    /**
     * Get all roles
     * @param page Page number for pagination
     * @param perPage Number of items per page for pagination
     * @param search Search term for departments (name, or ID)
     * @param sortBy Field to sort by
     * @param sortOrder Sort order
     * @param includePermissions Include permissions in the response
     * @returns RoleResponsePaginateDto List of all roles
     * @throws ApiError
     */
    public static rolesControllerFindAllRoles(
        page?: number,
        perPage: number = 10,
        search?: string,
        sortBy?: 'createdAt' | 'updatedAt' | 'name',
        sortOrder?: 'asc' | 'desc',
        includePermissions?: boolean,
    ): CancelablePromise<RoleResponsePaginateDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/roles',
            query: {
                'page': page,
                'perPage': perPage,
                'search': search,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
                'includePermissions': includePermissions,
            },
        });
    }
    /**
     * Get role by ID with all permissions
     * @param id
     * @returns RoleWithPermissionsDto Role found with permissions
     * @throws ApiError
     */
    public static rolesControllerFindOneRole(
        id: number,
    ): CancelablePromise<RoleWithPermissionsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/roles/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Role not found`,
            },
        });
    }
    /**
     * Update a role
     * @param id
     * @param requestBody
     * @returns RoleResponseDto Role updated successfully
     * @throws ApiError
     */
    public static rolesControllerUpdateRole(
        id: number,
        requestBody: UpdateRoleDto,
    ): CancelablePromise<RoleResponseDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/roles/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Role not found`,
                409: `Role name already exists`,
            },
        });
    }
    /**
     * Delete a role
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static rolesControllerRemoveRole(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/roles/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Cannot delete role assigned to users`,
                404: `Role not found`,
            },
        });
    }
    /**
     * Assign a permission to a role
     * @param id
     * @param requestBody
     * @returns any Permission assigned successfully
     * @throws ApiError
     */
    public static rolesControllerAssignPermission(
        id: number,
        requestBody: AssignPermissionDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/roles/{id}/permissions',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Role or permission not found`,
                409: `Permission already assigned to role`,
            },
        });
    }
    /**
     * Get all permissions for a role
     * @param id
     * @returns PermissionResponseDto List of role permissions
     * @throws ApiError
     */
    public static rolesControllerGetRolePermissions(
        id: number,
    ): CancelablePromise<Array<PermissionResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/roles/{id}/permissions',
            path: {
                'id': id,
            },
            errors: {
                404: `Role not found`,
            },
        });
    }
    /**
     * Bulk assign permissions to a role
     * @param id
     * @param requestBody
     * @returns any Permissions assigned (with summary)
     * @throws ApiError
     */
    public static rolesControllerBulkAssignPermissions(
        id: number,
        requestBody: BulkAssignPermissionsDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/roles/{id}/permissions/bulk',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Remove a permission from a role
     * @param id
     * @param permissionId
     * @returns void
     * @throws ApiError
     */
    public static rolesControllerRemovePermissionFromRole(
        id: number,
        permissionId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/roles/{id}/permissions/{permissionId}',
            path: {
                'id': id,
                'permissionId': permissionId,
            },
            errors: {
                404: `Role, permission, or assignment not found`,
            },
        });
    }
    /**
     * Create a new permission
     * @param requestBody
     * @returns PermissionResponseDto Permission created successfully
     * @throws ApiError
     */
    public static rolesControllerCreatePermission(
        requestBody: CreatePermissionDto,
    ): CancelablePromise<PermissionResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/roles/permissions',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                409: `Permission already exists`,
            },
        });
    }
    /**
     * Get all permissions
     * @param menuOnly Return only menu permissions
     * @returns PermissionResponseDto List of all permissions
     * @throws ApiError
     */
    public static rolesControllerFindAllPermissions(
        menuOnly?: boolean,
    ): CancelablePromise<Array<PermissionResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/roles/permissions',
            query: {
                'menuOnly': menuOnly,
            },
        });
    }
    /**
     * Get permission by ID
     * @param id
     * @returns PermissionResponseDto Permission found
     * @throws ApiError
     */
    public static rolesControllerFindOnePermission(
        id: number,
    ): CancelablePromise<PermissionResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/roles/permissions/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Permission not found`,
            },
        });
    }
    /**
     * Update a permission
     * @param id
     * @param requestBody
     * @returns PermissionResponseDto Permission updated successfully
     * @throws ApiError
     */
    public static rolesControllerUpdatePermission(
        id: number,
        requestBody: UpdatePermissionDto,
    ): CancelablePromise<PermissionResponseDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/roles/permissions/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Permission not found`,
                409: `Permission name already exists`,
            },
        });
    }
    /**
     * Delete a permission
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static rolesControllerRemovePermission(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/roles/permissions/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Permission not found`,
                409: `Cannot delete permission assigned to roles`,
            },
        });
    }
}
