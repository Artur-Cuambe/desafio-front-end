/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerResponseDto } from './CustomerResponseDto';
export type OrderResponseDto = {
    /**
     * Order ID
     */
    id: number;
    /**
     * Ref
     */
    ref: string;
    /**
     * Custumer ID
     */
    customerId: number;
    /**
     * Status
     */
    status: string;
    /**
     * Address
     */
    deliveryAddress: Record<string, any>;
    /**
     * Description
     */
    deliveryNotes: Record<string, any>;
    /**
     * Object of custumer
     */
    customer: CustomerResponseDto;
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

