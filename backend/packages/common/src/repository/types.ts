/**
 * Repository Layer Types
 * Core types for the generic repository pattern with pagination, sorting, population, and selection
 */

// ============================================================================
// Pagination Types
// ============================================================================

export interface PaginationOptions {
    /** Page number (1-indexed) */
    page?: number;
    /** Number of items per page */
    limit?: number;
}

export interface PaginationMeta {
    /** Total number of items */
    total: number;
    /** Current page number */
    page: number;
    /** Items per page */
    limit: number;
    /** Total number of pages */
    totalPages: number;
    /** Whether there is a next page */
    hasNext: boolean;
    /** Whether there is a previous page */
    hasPrev: boolean;
}

export interface PaginatedResponse<T> {
    /** Array of items for the current page */
    data: T[];
    /** Pagination metadata */
    meta: PaginationMeta;
}

// ============================================================================
// Sorting Types
// ============================================================================

export type SortOrder = 'asc' | 'desc';

export interface SortOption<T = unknown> {
    /** Field to sort by */
    field: keyof T;
    /** Sort order */
    order: SortOrder;
}

// ============================================================================
// Query Options
// ============================================================================

export interface FindOneOptions<TInclude, TSelect> {
    /** Relations to include (population) */
    include?: TInclude;
    /** Fields to select */
    select?: TSelect;
}

export interface FindAllOptions<TWhere, TInclude, TSelect, TOrderBy> {
    /** Filter conditions */
    where?: TWhere;
    /** Pagination options */
    pagination?: PaginationOptions;
    /** Sorting options */
    orderBy?: TOrderBy;
    /** Relations to include (population) */
    include?: TInclude;
    /** Fields to select */
    select?: TSelect;
}

export interface UpdateOptions<TInclude, TSelect> {
    /** Relations to include in the returned data */
    include?: TInclude;
    /** Fields to select in the returned data */
    select?: TSelect;
}

// ============================================================================
// Default Values
// ============================================================================

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const MAX_LIMIT = 100;
