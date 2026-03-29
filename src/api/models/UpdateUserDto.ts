/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateUserDto = {
    /**
     * Updated username
     */
    username?: string;
    /**
     * Updated email
     */
    email?: string;
    /**
     * Profile picture URL
     */
    picture?: string;
    /**
     * User active status
     */
    isActive?: boolean;
    /**
     * Entity ID (organization/hotel ID)
     */
    entityId?: number;
    /**
     * Role ID to assign to the user
     */
    roleId: number;
    /**
     * Customer ID (optional)
     */
    customerId?: number;
    /**
     * Whether user must change password on next login
     */
    mustChangePassword?: boolean;
    /**
     * Whether two-factor authentication is enabled
     */
    twoFactorEnabled?: boolean;
};

