/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserComposedDto } from './UserComposedDto';
export type AuthComposedDto = {
    /**
     * JWT access token
     */
    accessToken: string;
    /**
     * JWT refresh token
     */
    refreshToken: string;
    /**
     * User data with roles
     */
    user: UserComposedDto;
    /**
     * Whether 2FA verification is required
     */
    requiresTwoFactor?: boolean;
    /**
     * Temporary token for 2FA verification
     */
    tempToken?: string;
    /**
     * Metadata about the composed response
     */
    _metadata: Record<string, any>;
};

