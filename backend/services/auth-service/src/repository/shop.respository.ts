import { prisma, Prisma, PrismaRepository, Shops } from "@multi-vendor-e-commerce/common";


export class ShopRepository extends PrismaRepository<
    Shops,
    Prisma.ShopsCreateInput,
    Prisma.ShopsUpdateInput,
    Prisma.ShopsWhereInput,
    Prisma.ShopsWhereUniqueInput,
    Prisma.ShopsInclude,
    Prisma.ShopsSelect,
    Prisma.ShopsOrderByWithRelationInput
> {
    constructor() {
        super(prisma.shops);
    }


}