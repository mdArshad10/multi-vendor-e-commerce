import { prisma, Prisma, PrismaRepository, Products } from "@multi-vendor-e-commerce/common";


export class ProductRepository extends PrismaRepository<
    Products,
    Prisma.ProductsCreateInput,
    Prisma.ProductsUpdateInput,
    Prisma.ProductsWhereInput,
    Prisma.ProductsWhereUniqueInput,
    Prisma.ProductsInclude,
    Prisma.ProductsSelect,
    Prisma.ProductsOrderByWithRelationInput
> {
    constructor() {
        super(prisma.products);
    }


}