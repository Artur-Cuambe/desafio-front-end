/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserResponseDto } from './UserResponseDto';
export type UserComposedDto = {
    /**
     * User basic information
     */
    user: UserResponseDto;
    /**
     * Number of active sessions
     */
    sessionCount?: number;
    /**
     * Last activity timestamp
     */
    lastActivity?: string;
    /**
     * Metadata about the composed response
     */
    _metadata: Record<string, any>;
};

