/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateUserDto = {
    /**
     * User email address
     */
    email: string;
    /**
     * Username
     */
    username: string;
    /**
     * Password (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)
     */
    password: string;
    /**
     * Entity ID (organization/hotel ID)
     */
    entityId: number;
    /**
     * Role ID to assign to the user
     */
    roleId: number;
    /**
     * Customer ID (optional)
     */
    customerId?: string;
    /**
     * Profile picture URL
     */
    picture?: string;
};

