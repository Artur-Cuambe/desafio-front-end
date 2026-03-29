/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Enable2faDto } from '../models/Enable2faDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TwoFactorAuthService {
    /**
     * @returns any 2FA generated successful
     * @throws ApiError
     */
    public static twoFactorAuthControllerGenerateSecret(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/2fa/generate',
        });
    }
    /**
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static twoFactorAuthControllerEnableTwoFactorAuth(
        requestBody: Enable2faDto,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/2fa/enable',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns void
     * @throws ApiError
     */
    public static twoFactorAuthControllerDisableTwoFactorAuth(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/2fa/disable',
        });
    }
}
