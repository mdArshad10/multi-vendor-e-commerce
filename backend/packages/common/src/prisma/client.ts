/**
 * Prisma Client Singleton
 * Ensures a single instance of PrismaClient is used throughout the application
 */

import { PrismaClient } from '@prisma/client';

declare global {
    // eslint-disable-next-line no-var
    var __prisma: PrismaClient | undefined;
}

/**
 * Create or reuse a PrismaClient instance
 * In development, this prevents creating multiple connections during hot reloading
 */
function createPrismaClient(): PrismaClient {
    const client = new PrismaClient({
        log:
            process.env.NODE_ENV === 'development'
                ? ['query', 'info', 'warn', 'error']
                : ['error'],
    });

    return client;
}

/**
 * Singleton PrismaClient instance
 * Use this throughout your application to interact with the database
 *
 * @example
 * ```typescript
 * import { prisma } from '@multi-vendor-e-commerce/common';
 *
 * const users = await prisma.user.findMany();
 * ```
 */
export const prisma: PrismaClient = globalThis.__prisma ?? createPrismaClient();

// In development, save the client to global to prevent multiple instances
if (process.env.NODE_ENV !== 'production') {
    globalThis.__prisma = prisma;
}

/**
 * Disconnect from the database
 * Call this when shutting down the application
 */
export async function disconnectPrisma(): Promise<void> {
    await prisma.$disconnect();
}
