import { prisma, Prisma, PrismaRepository,  } from "@multi-vendor-e-commerce/common";


export class ProductRepository extends PrismaRepository<
    Product,
    Prisma.UserCreateInput,
    Prisma.UserUpdateInput,
    Prisma.UserWhereInput,
    Prisma.UserWhereUniqueInput,
    Prisma.UserInclude,
    Prisma.UserSelect,
    Prisma.UserOrderByWithRelationInput
> {
    constructor() {
        super(prisma.users);
    }

    
}