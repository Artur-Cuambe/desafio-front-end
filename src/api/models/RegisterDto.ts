/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RegisterDto = {
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
     * Customer ID (optional)
     */
    customerId?: string;
};

