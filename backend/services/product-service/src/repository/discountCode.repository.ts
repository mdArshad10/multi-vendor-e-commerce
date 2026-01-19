import { prisma, Prisma, PrismaRepository,discount_code  } from "@multi-vendor-e-commerce/common";


export class DiscountCodeRepository extends PrismaRepository<
    discount_code,
    Prisma.discount_codeCreateInput,
    Prisma.discount_codeUpdateInput,
    Prisma.discount_codeWhereInput,
    Prisma.discount_codeWhereUniqueInput,
    Prisma.discount_codeOmit,
    Prisma.discount_codeSelect,
    Prisma.discount_codeOrderByWithRelationInput
> {
    constructor() {
        super(prisma.discount_code);
    }

    
}