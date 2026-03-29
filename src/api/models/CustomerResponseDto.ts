/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CustomerResponseDto = {
    /**
     * Customer ID
     */
    id: number;
    /**
     * firstName name
     */
    firstName: string;
    /**
     * lastName name
     */
    lastName: string;
    /**
     * Gender customer
     */
    gender: string;
    /**
     * Phone Number
     */
    phoneNumber: string;
    /**
     * Entity ID (organization/hotel ID)
     */
    entityId?: Record<string, any>;
    /**
     * Account creation date
     */
    createdAt: string;
    /**
     * Last update date
     */
    updatedAt: string;
};

