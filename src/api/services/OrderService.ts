/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateOrderDto } from '../models/CreateOrderDto';
import type { OrderResponseDto } from '../models/OrderResponseDto';
import type { OrderResponsePaginateDto } from '../models/OrderResponsePaginateDto';
import type { UpdateOrderDto } from '../models/UpdateOrderDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrderService {
    /**
     * Get all orders
     * @param page Page number for pagination
     * @param perPage Number of items per page for pagination
     * @param search Search term for orders (name, or ID)
     * @param sortBy Field to sort by
     * @param sortOrder Sort order
     * @returns OrderResponsePaginateDto List of all orders
     * @throws ApiError
     */
    public static orderControllerFindAll(
        page?: number,
        perPage: number = 10,
        search?: string,
        sortBy?: 'createdAt' | 'updatedAt' | 'ref',
        sortOrder?: 'asc' | 'desc',
    ): CancelablePromise<OrderResponsePaginateDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/order',
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
     * Create a new order
     * @param requestBody
     * @returns OrderResponseDto Order created successfully
     * @throws ApiError
     */
    public static orderControllerCreate(
        requestBody: CreateOrderDto,
    ): CancelablePromise<OrderResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/order',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get order by ID
     * @param id
     * @returns OrderResponseDto Order found
     * @throws ApiError
     */
    public static orderControllerFindOne(
        id: number,
    ): CancelablePromise<OrderResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/order/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Order not found`,
            },
        });
    }
    /**
     * Update order
     * @param id
     * @param requestBody
     * @returns OrderResponseDto Order updated successfully
     * @throws ApiError
     */
    public static orderControllerUpdate(
        id: number,
        requestBody: UpdateOrderDto,
    ): CancelablePromise<OrderResponseDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/order/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden - can only updated by admin`,
                404: `Order not found`,
            },
        });
    }
    /**
     * Delete order
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static orderControllerRemove(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/order/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `order not found`,
            },
        });
    }
}
