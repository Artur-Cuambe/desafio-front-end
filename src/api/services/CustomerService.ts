/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateCustomerDto } from '../models/CreateCustomerDto';
import type { CustomerResponseDto } from '../models/CustomerResponseDto';
import type { CustomerResponsePaginateDto } from '../models/CustomerResponsePaginateDto';
import type { UpdateCustomerDto } from '../models/UpdateCustomerDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CustomerService {
    /**
     * Get all Customers
     * @param page Page number for pagination
     * @param perPage Number of items per page for pagination
     * @param search Search term for customers (name, or ID)
     * @param sortBy Field to sort by
     * @param sortOrder Sort order
     * @returns CustomerResponsePaginateDto List of all Customers
     * @throws ApiError
     */
    public static customerControllerFindAll(
        page?: number,
        perPage: number = 10,
        search?: string,
        sortBy?: 'createdAt' | 'updatedAt' | 'firstName',
        sortOrder?: 'asc' | 'desc',
    ): CancelablePromise<CustomerResponsePaginateDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/customer',
            query: {
                'page': page,
                'perPage': perPage,
                'search': search,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
            },
        });
    }
    /**
     * Create a new customer
     * @param requestBody
     * @returns CustomerResponseDto Customer created successfully
     * @throws ApiError
     */
    public static customerControllerCreate(
        requestBody: CreateCustomerDto,
    ): CancelablePromise<CustomerResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/customer',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get customer by ID
     * @param id
     * @returns CustomerResponseDto Customer found
     * @throws ApiError
     */
    public static customerControllerFindOne(
        id: number,
    ): CancelablePromise<CustomerResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/customer/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Customer not found`,
            },
        });
    }
    /**
     * Update customer
     * @param id
     * @param requestBody
     * @returns CustomerResponseDto Customer updated successfully
     * @throws ApiError
     */
    public static customerControllerUpdate(
        id: number,
        requestBody: UpdateCustomerDto,
    ): CancelablePromise<CustomerResponseDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/customer/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden - can only updated by admin`,
                404: `customer not found`,
            },
        });
    }
    /**
     * Delete customer
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static customerControllerRemove(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/customer/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `customer not found`,
            },
        });
    }
}
