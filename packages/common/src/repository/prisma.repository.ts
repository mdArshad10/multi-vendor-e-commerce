/**
 * Prisma Repository Implementation
 * Concrete implementation of BaseRepository for Prisma ORM
 */

import { BaseRepository } from './base.repository.js';
import type {
    PaginatedResponse,
    FindOneOptions,
    FindAllOptions,
    UpdateOptions,
    DEFAULT_PAGE,
    DEFAULT_LIMIT,
    MAX_LIMIT,
} from './types.js';

/**
 * Type definition for a Prisma model delegate
 * This represents the methods available on prisma.model (e.g., prisma.user)
 */
type PrismaDelegate = {
    create: (args: { data: unknown; include?: unknown; select?: unknown }) => Promise<unknown>;
    createMany: (args: { data: unknown[] }) => Promise<{ count: number }>;
    findUnique: (args: {
        where: unknown;
        include?: unknown;
        select?: unknown;
    }) => Promise<unknown | null>;
    findFirst: (args: {
        where?: unknown;
        include?: unknown;
        select?: unknown;
    }) => Promise<unknown | null>;
    findMany: (args: {
        where?: unknown;
        include?: unknown;
        select?: unknown;
        orderBy?: unknown;
        skip?: number;
        take?: number;
    }) => Promise<unknown[]>;
    update: (args: {
        where: unknown;
        data: unknown;
        include?: unknown;
        select?: unknown;
    }) => Promise<unknown>;
    updateMany: (args: { where: unknown; data: unknown }) => Promise<{ count: number }>;
    delete: (args: { where: unknown }) => Promise<unknown>;
    deleteMany: (args: { where: unknown }) => Promise<{ count: number }>;
    count: (args?: { where?: unknown }) => Promise<number>;
};

/**
 * Prisma implementation of the BaseRepository
 * Provides full CRUD operations with pagination, sorting, population, and selection
 *
 * @example
 * ```typescript
 * import { PrismaRepository, prisma } from '@multi-vendor-e-commerce/common';
 * import { Prisma, User } from '@prisma/client';
 *
 * class UserRepository extends PrismaRepository<
 *   User,
 *   Prisma.UserCreateInput,
 *   Prisma.UserUpdateInput,
 *   Prisma.UserWhereInput,
 *   Prisma.UserWhereUniqueInput,
 *   Prisma.UserInclude,
 *   Prisma.UserSelect,
 *   Prisma.UserOrderByWithRelationInput
 * > {
 *   constructor() {
 *     super(prisma.user);
 *   }
 * }
 * ```
 */
export class PrismaRepository<
    TModel,
    TCreateInput,
    TUpdateInput,
    TWhereInput,
    TWhereUniqueInput,
    TInclude,
    TSelect,
    TOrderBy,
> extends BaseRepository<
    TModel,
    TCreateInput,
    TUpdateInput,
    TWhereInput,
    TWhereUniqueInput,
    TInclude,
    TSelect,
    TOrderBy
> {
    constructor(protected readonly model: PrismaDelegate) {
        super();
    }

    // ==========================================================================
    // CREATE Operations
    // ==========================================================================

    async create(data: TCreateInput): Promise<TModel> {
        return this.model.create({ data }) as Promise<TModel>;
    }

    async createMany(data: TCreateInput[]): Promise<{ count: number }> {
        return this.model.createMany({ data: data as unknown[] });
    }

    // ==========================================================================
    // READ Operations
    // ==========================================================================

    async findById(
        where: TWhereUniqueInput,
        options?: FindOneOptions<TInclude, TSelect>,
    ): Promise<TModel | null> {
        return this.model.findUnique({
            where,
            include: options?.include,
            select: options?.select,
        }) as Promise<TModel | null>;
    }

    async findOne(
        where: TWhereInput,
        options?: FindOneOptions<TInclude, TSelect>,
    ): Promise<TModel | null> {
        return this.model.findFirst({
            where,
            include: options?.include,
            select: options?.select,
        }) as Promise<TModel | null>;
    }

    async findAll(
        options?: FindAllOptions<TWhereInput, TInclude, TSelect, TOrderBy>,
    ): Promise<PaginatedResponse<TModel>> {
        const page = Math.max(1, options?.pagination?.page ?? 1);
        const limit = Math.min(100, Math.max(1, options?.pagination?.limit ?? 10));
        const skip = (page - 1) * limit;

        // Execute count and findMany in parallel for better performance
        const [total, data] = await Promise.all([
            this.model.count({ where: options?.where }),
            this.model.findMany({
                where: options?.where,
                include: options?.include,
                select: options?.select,
                orderBy: options?.orderBy,
                skip,
                take: limit,
            }),
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data: data as TModel[],
            meta: {
                total,
                page,
                limit,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1,
            },
        };
    }

    async findMany(
        options?: Omit<FindAllOptions<TWhereInput, TInclude, TSelect, TOrderBy>, 'pagination'>,
    ): Promise<TModel[]> {
        return this.model.findMany({
            where: options?.where,
            include: options?.include,
            select: options?.select,
            orderBy: options?.orderBy,
        }) as Promise<TModel[]>;
    }

    // ==========================================================================
    // UPDATE Operations
    // ==========================================================================

    async update(
        where: TWhereUniqueInput,
        data: TUpdateInput,
        options?: UpdateOptions<TInclude, TSelect>,
    ): Promise<TModel> {
        return this.model.update({
            where,
            data,
            include: options?.include,
            select: options?.select,
        }) as Promise<TModel>;
    }

    async updateMany(
        where: TWhereInput,
        data: TUpdateInput,
    ): Promise<{ count: number }> {
        return this.model.updateMany({ where, data });
    }

    // ==========================================================================
    // DELETE Operations
    // ==========================================================================

    async delete(where: TWhereUniqueInput): Promise<TModel> {
        return this.model.delete({ where }) as Promise<TModel>;
    }

    async deleteMany(where: TWhereInput): Promise<{ count: number }> {
        return this.model.deleteMany({ where });
    }

    // ==========================================================================
    // Utility Operations
    // ==========================================================================

    async count(where?: TWhereInput): Promise<number> {
        return this.model.count({ where });
    }

    async exists(where: TWhereInput): Promise<boolean> {
        const count = await this.model.count({ where });
        return count > 0;
    }
}
