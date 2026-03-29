/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RequestPasswordResetDto } from '../models/RequestPasswordResetDto';
import type { ResetPasswordDto } from '../models/ResetPasswordDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PasswordResetService {
    /**
     * @param requestBody
     * @returns string return a token
     * @throws ApiError
     */
    public static passwordResetControllerRequestPasswordReset(
        requestBody: RequestPasswordResetDto,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/password-reset/request',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static passwordResetControllerResetPassword(
        requestBody: ResetPasswordDto,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/password-reset/reset',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
