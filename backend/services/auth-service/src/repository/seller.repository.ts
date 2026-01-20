import { prisma, Prisma, PrismaRepository, Sellers } from "@multi-vendor-e-commerce/common";


export class SellerRepository extends PrismaRepository<
    Sellers,
    Prisma.UserCreateInput,
    Prisma.UserUpdateInput,
    Prisma.UserWhereInput,
    Prisma.UserWhereUniqueInput,
    Prisma.UserInclude,
    Prisma.UserSelect,
    Prisma.UserOrderByWithRelationInput
> {
    constructor() {
        super(prisma.sellers);
    }

    async findUserByEmail(email: string) {
        return this.findOne({ email })
    }

}