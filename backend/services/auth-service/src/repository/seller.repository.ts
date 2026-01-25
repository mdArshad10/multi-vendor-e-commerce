import { prisma, Prisma, PrismaRepository, Sellers } from "@multi-vendor-e-commerce/common";


export class SellerRepository extends PrismaRepository<
    Sellers,
    Prisma.SellersCreateInput,
    Prisma.SellersUpdateInput,
    Prisma.SellersWhereInput,
    Prisma.SellersWhereUniqueInput,
    Prisma.SellersInclude,
    Prisma.SellersSelect,
    Prisma.SellersOrderByWithRelationInput
> {
    constructor() {
        super(prisma.sellers);
    }

    async findUserByEmail(email: string) {
        return this.findOne({ email })
    }

}