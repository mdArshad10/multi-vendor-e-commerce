import { prisma, Prisma, PrismaRepository, seller } from "@multi-vendor-e-commerce/common";


export class SellerRepository extends PrismaRepository<
    Seller,
    Prisma.UserCreateInput,
    Prisma.UserUpdateInput,
    Prisma.UserWhereInput,
    Prisma.UserWhereUniqueInput,
    Prisma.UserInclude,
    Prisma.UserSelect,
    Prisma.UserOrderByWithRelationInput
> {
    constructor() {
        super(prisma.seller);
    }

    async findUserByEmail(email: string) {
        return this.findOne({ email })
    }

}