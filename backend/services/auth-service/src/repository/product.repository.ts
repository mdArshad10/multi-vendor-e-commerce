import { prisma, Prisma, PrismaRepository, Products } from "@multi-vendor-e-commerce/common";


export class ProductRepository extends PrismaRepository<
    Products,
    Prisma.UserCreateInput,
    Prisma.UserUpdateInput,
    Prisma.UserWhereInput,
    Prisma.UserWhereUniqueInput,
    Prisma.UserInclude,
    Prisma.UserSelect,
    Prisma.UserOrderByWithRelationInput
> {
    constructor() {
        super(prisma.products);
    }


}