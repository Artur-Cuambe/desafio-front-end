/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthComposedDto } from '../models/AuthComposedDto';
import type { AuthResponseDto } from '../models/AuthResponseDto';
import type { ChangePasswordDto } from '../models/ChangePasswordDto';
import type { LoginDto } from '../models/LoginDto';
import type { RefreshTokenDto } from '../models/RefreshTokenDto';
import type { RegisterDto } from '../models/RegisterDto';
import type { UserResponseDto } from '../models/UserResponseDto';
import type { Verify2faDto } from '../models/Verify2faDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthenticationService {
    /**
     * Register new user
     * Create a new user account with email, username, and password
     * @param requestBody
     * @returns UserResponseDto User registered successfully
     * @throws ApiError
     */
    public static authControllerRegister(
        requestBody: RegisterDto,
    ): CancelablePromise<UserResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                409: `Email or username already exists`,
            },
        });
    }
    /**
     * User login
     * Authenticate user with email and password. Returns JWT tokens. If 2FA is enabled, returns requiresTwoFactor flag.
     * @param requestBody
     * @returns AuthResponseDto Login successful
     * @throws ApiError
     */
    public static authControllerLogin(
        requestBody: LoginDto,
    ): CancelablePromise<AuthResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid credentials or account locked`,
                409: `Account is locked due to too many failed login attempts`,
            },
        });
    }
    /**
     * Verify 2FA token
     * Verify the 2FA token after login to get the final JWT tokens.
     * @param requestBody
     * @returns AuthResponseDto 2FA verification successful
     * @throws ApiError
     */
    public static authControllerVerify2Fa(
        requestBody: Verify2faDto,
    ): CancelablePromise<AuthResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/2fa/verify',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid 2FA token`,
            },
        });
    }
    /**
     * Refresh access token
     * Get a new access token using a valid refresh token
     * @param requestBody
     * @returns AuthResponseDto Token refreshed successfully
     * @throws ApiError
     */
    public static authControllerRefresh(
        requestBody: RefreshTokenDto,
    ): CancelablePromise<AuthResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/refresh',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid or expired refresh token`,
            },
        });
    }
    /**
     * Logout current session
     * Invalidate the current session
     * @returns void
     * @throws ApiError
     */
    public static authControllerLogout(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/logout',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Logout all sessions
     * Invalidate all active sessions for the current user
     * @returns void
     * @throws ApiError
     */
    public static authControllerLogoutAll(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/logout-all',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Get current user profile
     * Retrieve the authenticated user's profile information
     * @returns UserResponseDto User profile retrieved successfully
     * @throws ApiError
     */
    public static authControllerGetProfile(): CancelablePromise<UserResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/auth/me',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Change password
     * Change the authenticated user's password
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static authControllerChangePassword(
        requestBody: ChangePasswordDto,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/change-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Current password is incorrect`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Check admin setup status
     * Check if initial admin setup is available and if the current user can perform the setup
     * @returns any Admin setup status retrieved successfully
     * @throws ApiError
     */
    public static authControllerGetAdminSetupStatus(): CancelablePromise<{
        /**
         * Whether admin setup is available (no admin exists)
         */
        setupAvailable?: boolean;
        /**
         * Whether the current user can perform the admin setup
         */
        currentUserCanSetup?: boolean;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/auth/admin-setup-status',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Setup initial admin user
     * Elevate the current user to admin role. Only available when no admin exists in the system.
     * @returns UserResponseDto Initial admin setup completed successfully
     * @throws ApiError
     */
    public static authControllerSetupInitialAdmin(): CancelablePromise<UserResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/setup-initial-admin',
            errors: {
                401: `Unauthorized - user not authenticated`,
                403: `Forbidden - an admin user already exists`,
                404: `Not found - user or admin role not found`,
                409: `Conflict - user already has admin role`,
                429: `Too many requests - rate limit exceeded`,
            },
        });
    }
    /**
     * Login with composed user data
     * Authenticate user and return JWT tokens with user data including roles and sessions.
     * @param requestBody
     * @returns AuthComposedDto Login successful with composed data
     * @throws ApiError
     */
    public static authControllerLoginComposed(
        requestBody: LoginDto,
    ): CancelablePromise<AuthComposedDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/composed/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid credentials or account locked`,
            },
        });
    }
    /**
     * Verify 2FA with composed user data
     * Verify 2FA token and return JWT tokens with user data including roles and sessions.
     * @param requestBody
     * @returns AuthComposedDto 2FA verification successful with composed data
     * @throws ApiError
     */
    public static authControllerVerify2FaComposed(
        requestBody: Verify2faDto,
    ): CancelablePromise<AuthComposedDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/composed/2fa/verify',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid 2FA token`,
            },
        });
    }
    /**
     * Refresh tokens with composed user data
     * Get new access token and return with user data including roles and sessions.
     * @param requestBody
     * @returns AuthComposedDto Token refreshed successfully with composed data
     * @throws ApiError
     */
    public static authControllerRefreshComposed(
        requestBody: RefreshTokenDto,
    ): CancelablePromise<AuthComposedDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/composed/refresh',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid or expired refresh token`,
            },
        });
    }
}
