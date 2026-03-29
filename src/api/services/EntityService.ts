/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateEntityDto } from '../models/CreateEntityDto';
import type { EntityResponseDto } from '../models/EntityResponseDto';
import type { EntityResponsePaginateDto } from '../models/EntityResponsePaginateDto';
import type { UpdateEntityDto } from '../models/UpdateEntityDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EntityService {
    /**
     * Get all entities
     * @param page Page number for pagination
     * @param perPage Number of items per page for pagination
     * @param search Search term for entities (email, name, or ID)
     * @param sortBy Field to sort by
     * @param sortOrder Sort order
     * @returns EntityResponsePaginateDto List of all entities
     * @throws ApiError
     */
    public static entityControllerFindAll(
        page?: number,
        perPage: number = 10,
        search?: string,
        sortBy?: 'createdAt' | 'updatedAt' | 'email' | 'name',
        sortOrder?: 'asc' | 'desc',
    ): CancelablePromise<EntityResponsePaginateDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/entity',
            query: {
                'page': page,
                'perPage': perPage,
                'search': search,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
            },
            errors: {
                400: `Erro ao listar os dados`,
            },
        });
    }
    /**
     * Create a new entity (admin only)
     * @param requestBody
     * @returns EntityResponseDto Entity created successfully
     * @throws ApiError
     */
    public static entityControllerCreate(
        requestBody: CreateEntityDto,
    ): CancelablePromise<EntityResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/entity',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden - can only created by admin`,
                409: `Email or name already exists`,
            },
        });
    }
    /**
     * Get entity by ID
     * @param id
     * @returns EntityResponseDto Entity found
     * @throws ApiError
     */
    public static entityControllerFindOne(
        id: number,
    ): CancelablePromise<EntityResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/entity/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Entity not found`,
            },
        });
    }
    /**
     * Update entity
     * @param id
     * @param requestBody
     * @returns EntityResponseDto Entity updated successfully
     * @throws ApiError
     */
    public static entityControllerUpdate(
        id: number,
        requestBody: UpdateEntityDto,
    ): CancelablePromise<EntityResponseDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/entity/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden - can only updated by admin`,
                404: `Entity not found`,
                409: `Email or name already exists`,
            },
        });
    }
    /**
     * Delete entity
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static entityControllerRemove(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/entity/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Entity not found`,
            },
        });
    }
}
