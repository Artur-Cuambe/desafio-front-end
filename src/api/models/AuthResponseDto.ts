/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserResponseDto } from './UserResponseDto';
export type AuthResponseDto = {
    /**
     * JWT access token
     */
    accessToken: string;
    /**
     * JWT refresh token
     */
    refreshToken: string;
    /**
     * User information
     */
    user: UserResponseDto;
    /**
     * Indicates if 2FA is required
     */
    requiresTwoFactor?: boolean;
    /**
     * Temporary token for 2FA verification
     */
    tempToken?: string;
};

