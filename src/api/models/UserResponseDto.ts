/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UserResponseDto = {
    /**
     * User ID
     */
    id: number;
    /**
     * User email
     */
    email: string;
    /**
     * Username
     */
    username: string;
    /**
     * Profile picture URL
     */
    picture?: Record<string, any>;
    /**
     * Is account active
     */
    isActive: boolean;
    /**
     * Last login timestamp
     */
    lastLoginAt?: Record<string, any>;
    /**
     * Is 2FA enabled
     */
    twoFactorEnabled: boolean;
    /**
     * Entity ID
     */
    entityId: number;
    /**
     * Role ID
     */
    roleId: Record<string, any>;
    /**
     * Account creation date
     */
    createdAt: string;
    /**
     * Last update date
     */
    updatedAt: string;
};

