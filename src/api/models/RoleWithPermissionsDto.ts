/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PermissionResponseDto } from './PermissionResponseDto';
export type RoleWithPermissionsDto = {
    /**
     * Role ID
     */
    id: number;
    /**
     * Role name
     */
    name: string;
    /**
     * Role description
     */
    description?: Record<string, any>;
    /**
     * Department ID
     */
    departmentId?: Record<string, any>;
    /**
     * Creation timestamp
     */
    createdAt: string;
    /**
     * Last update timestamp
     */
    updatedAt: string;
    /**
     * Permissions assigned to this role
     */
    permissions: Array<PermissionResponseDto>;
    /**
     * Total number of permissions
     */
    permissionCount: number;
    /**
     * Whether this permission represents a menu item
     */
    isMenu: boolean;
};

