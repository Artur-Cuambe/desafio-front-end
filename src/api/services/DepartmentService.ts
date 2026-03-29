/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateDepartmentDto } from '../models/CreateDepartmentDto';
import type { DepartmentResponseDto } from '../models/DepartmentResponseDto';
import type { DepartmentResponsePaginateDto } from '../models/DepartmentResponsePaginateDto';
import type { UpdateDepartmentDto } from '../models/UpdateDepartmentDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DepartmentService {
    /**
     * Get all departments
     * @param page Page number for pagination
     * @param perPage Number of items per page for pagination
     * @param search Search term for departments (name, or ID)
     * @param sortBy Field to sort by
     * @param sortOrder Sort order
     * @returns DepartmentResponsePaginateDto List of all departments
     * @throws ApiError
     */
    public static departmentControllerFindAll(
        page?: number,
        perPage: number = 10,
        search?: string,
        sortBy?: 'createdAt' | 'updatedAt' | 'name',
        sortOrder?: 'asc' | 'desc',
    ): CancelablePromise<DepartmentResponsePaginateDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/department',
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
     * Create a new department (admin only)
     * @param requestBody
     * @returns DepartmentResponseDto Department created successfully
     * @throws ApiError
     */
    public static departmentControllerCreate(
        requestBody: CreateDepartmentDto,
    ): CancelablePromise<DepartmentResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/department',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get department by ID
     * @param id
     * @returns DepartmentResponseDto Department found
     * @throws ApiError
     */
    public static departmentControllerFindOne(
        id: number,
    ): CancelablePromise<DepartmentResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/department/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Department not found`,
            },
        });
    }
    /**
     * Update department
     * @param id
     * @param requestBody
     * @returns DepartmentResponseDto Department updated successfully
     * @throws ApiError
     */
    public static departmentControllerUpdate(
        id: number,
        requestBody: UpdateDepartmentDto,
    ): CancelablePromise<DepartmentResponseDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/department/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden - can only updated by admin`,
                404: `Department not found`,
            },
        });
    }
    /**
     * Delete department
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static departmentControllerRemove(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/department/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Department not found`,
            },
        });
    }
}
