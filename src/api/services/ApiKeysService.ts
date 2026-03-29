/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateApiKeyDto } from '../models/CreateApiKeyDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ApiKeysService {
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static apiKeysControllerCreateApiKey(
        requestBody: CreateApiKeyDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/api-keys',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static apiKeysControllerGetApiKeys(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/api-keys',
        });
    }
    /**
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static apiKeysControllerDeleteApiKey(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/api-keys/{id}',
            path: {
                'id': id,
            },
        });
    }
}
