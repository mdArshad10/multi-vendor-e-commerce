/**
 * Base Repository Abstract Class
 * Defines the contract for all repository implementations
 */

import type {
    PaginatedResponse,
    FindOneOptions,
    FindAllOptions,
    UpdateOptions,
} from './types.js';

/**
 * Abstract base repository that defines the contract for CRUD operations.
 * This allows for different ORM implementations (Prisma, Drizzle, etc.)
 *
 * @template TModel - The model/entity type
 * @template TCreateInput - Input type for creating records
 * @template TUpdateInput - Input type for updating records
 * @template TWhereInput - Input type for where clauses
 * @template TWhereUniqueInput - Input type for unique where clauses (e.g., by ID)
 * @template TInclude - Input type for relations to include
 * @template TSelect - Input type for field selection
 * @template TOrderBy - Input type for ordering
 */
export abstract class BaseRepository<
    TModel,
    TCreateInput,
    TUpdateInput,
    TWhereInput,
    TWhereUniqueInput,
    TInclude,
    TSelect,
    TOrderBy,
> {
    // ==========================================================================
    // CREATE Operations
    // ==========================================================================

    /**
     * Create a single record
     * @param data - The data to create the record with
     * @returns The created record
     */
    abstract create(data: TCreateInput): Promise<TModel>;

    /**
     * Create multiple records
     * @param data - Array of data to create records with
     * @returns Count of created records
     */
    abstract createMany(data: TCreateInput[]): Promise<{ count: number }>;

    // ==========================================================================
    // READ Operations
    // ==========================================================================

    /**
     * Find a record by its unique identifier
     * @param where - Unique where clause (typically ID)
     * @param options - Include and select options
     * @returns The found record or null
     */
    abstract findById(
        where: TWhereUniqueInput,
        options?: FindOneOptions<TInclude, TSelect>,
    ): Promise<TModel | null>;

    /**
     * Find a single record matching the criteria
     * @param where - Where clause
     * @param options - Include and select options
     * @returns The found record or null
     */
    abstract findOne(
        where: TWhereInput,
        options?: FindOneOptions<TInclude, TSelect>,
    ): Promise<TModel | null>;

    /**
     * Find all records with pagination, sorting, population, and selection
     * @param options - Query options including where, pagination, orderBy, include, select
     * @returns Paginated response with data and metadata
     */
    abstract findAll(
        options?: FindAllOptions<TWhereInput, TInclude, TSelect, TOrderBy>,
    ): Promise<PaginatedResponse<TModel>>;

    /**
     * Find all records without pagination
     * @param options - Query options
     * @returns Array of records
     */
    abstract findMany(
        options?: Omit<FindAllOptions<TWhereInput, TInclude, TSelect, TOrderBy>, 'pagination'>,
    ): Promise<TModel[]>;

    // ==========================================================================
    // UPDATE Operations
    // ==========================================================================

    /**
     * Update a single record
     * @param where - Unique where clause to find the record
     * @param data - The data to update
     * @param options - Include options for returned data
     * @returns The updated record
     */
    abstract update(
        where: TWhereUniqueInput,
        data: TUpdateInput,
        options?: UpdateOptions<TInclude, TSelect>,
    ): Promise<TModel>;

    /**
     * Update multiple records
     * @param where - Where clause to find records
     * @param data - The data to update
     * @returns Count of updated records
     */
    abstract updateMany(
        where: TWhereInput,
        data: TUpdateInput,
    ): Promise<{ count: number }>;

    // ==========================================================================
    // DELETE Operations
    // ==========================================================================

    /**
     * Delete a single record
     * @param where - Unique where clause to find the record
     * @returns The deleted record
     */
    abstract delete(where: TWhereUniqueInput): Promise<TModel>;

    /**
     * Delete multiple records
     * @param where - Where clause to find records
     * @returns Count of deleted records
     */
    abstract deleteMany(where: TWhereInput): Promise<{ count: number }>;

    // ==========================================================================
    // Utility Operations
    // ==========================================================================

    /**
     * Count records matching the criteria
     * @param where - Optional where clause
     * @returns The count of matching records
     */
    abstract count(where?: TWhereInput): Promise<number>;

    /**
     * Check if a record exists
     * @param where - Where clause
     * @returns True if record exists
     */
    abstract exists(where: TWhereInput): Promise<boolean>;
}
