/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from '../models/CreateUserDto';
import type { UpdateUserDto } from '../models/UpdateUserDto';
import type { UserComposedDto } from '../models/UserComposedDto';
import type { UserResponseDto } from '../models/UserResponseDto';
import type { UserResponsePaginateDto } from '../models/UserResponsePaginateDto';
import type { UsersListComposedDto } from '../models/UsersListComposedDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Get users list with composed data (roles, stats)
     * @param page Page number
     * @param perPage Items per page
     * @param search Search term
     * @param sortBy Field to sort by
     * @param sortOrder Sort order
     * @returns UsersListComposedDto Users list with composed data
     * @throws ApiError
     */
    public static usersControllerGetUsersListComposed(
        page?: number,
        perPage: number = 10,
        search?: string,
        sortBy?: 'createdAt' | 'updatedAt' | 'email' | 'username',
        sortOrder?: 'asc' | 'desc',
    ): CancelablePromise<UsersListComposedDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users/composed/list',
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
     * Get user with composed data (roles, sessions)
     * @param id
     * @returns UserComposedDto User with composed data
     * @throws ApiError
     */
    public static usersControllerGetUserComposed(
        id: number,
    ): CancelablePromise<UserComposedDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users/composed/{id}',
            path: {
                'id': id,
            },
            errors: {
                403: `Forbidden - can only access own data`,
                404: `User not found`,
            },
        });
    }
    /**
     * Get all users
     * @param page Page number for pagination
     * @param perPage Number of items per page for pagination
     * @param search Search term for users (email, username, or ID)
     * @param sortBy Field to sort by
     * @param sortOrder Sort order
     * @returns UserResponsePaginateDto List of all users
     * @throws ApiError
     */
    public static usersControllerFindAll(
        page?: number,
        perPage: number = 10,
        search?: string,
        sortBy?: 'createdAt' | 'updatedAt' | 'email' | 'username',
        sortOrder?: 'asc' | 'desc',
    ): CancelablePromise<UserResponsePaginateDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users',
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
     * Create a new user (admin only)
     * @param requestBody
     * @returns UserResponseDto User created successfully
     * @throws ApiError
     */
    public static usersControllerCreate(
        requestBody: CreateUserDto,
    ): CancelablePromise<UserResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/users',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                409: `Email or username already exists`,
            },
        });
    }
    /**
     * Get user by ID
     * @param id
     * @returns UserResponseDto User found
     * @throws ApiError
     */
    public static usersControllerFindOne(
        id: number,
    ): CancelablePromise<UserResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                403: `Forbidden - can only access own user data`,
                404: `User not found`,
            },
        });
    }
    /**
     * Update user
     * @param id
     * @param requestBody
     * @returns UserResponseDto User updated successfully
     * @throws ApiError
     */
    public static usersControllerUpdate(
        id: number,
        requestBody: UpdateUserDto,
    ): CancelablePromise<UserResponseDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/users/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden - can only update own user data`,
                404: `User not found`,
                409: `Email or username already exists`,
            },
        });
    }
    /**
     * Delete user
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static usersControllerRemove(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `User not found`,
            },
        });
    }
}
