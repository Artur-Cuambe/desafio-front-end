/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserComposedDto } from './UserComposedDto';
export type UsersListComposedDto = {
    /**
     * List of users with composed data
     */
    users: Array<UserComposedDto>;
    /**
     * Pagination information
     */
    pagination: Record<string, any>;
    /**
     * Summary statistics
     */
    summary: Record<string, any>;
    /**
     * Metadata about the composed response
     */
    _metadata: Record<string, any>;
};

