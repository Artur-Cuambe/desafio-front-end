/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SessionsService {
    /**
     * @returns any
     * @throws ApiError
     */
    public static sessionsControllerGetActiveSessions(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/sessions',
        });
    }
    /**
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static sessionsControllerRevokeSession(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/sessions/{id}',
            path: {
                'id': id,
            },
        });
    }
}
