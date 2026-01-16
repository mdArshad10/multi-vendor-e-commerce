import { prisma, Prisma, PrismaRepository, User } from "@multi-vendor-e-commerce/common";


export class UserRepository extends PrismaRepository<
    User,
    Prisma.UserCreateInput,
    Prisma.UserUpdateInput,
    Prisma.UserWhereInput,
    Prisma.UserWhereUniqueInput,
    Prisma.UserInclude,
    Prisma.UserSelect,
    Prisma.UserOrderByWithRelationInput
> {
    constructor() {
        super(prisma.user);
    }

    async findUserByEmail(email: string) {
        return this.findOne({ email })
    }

}