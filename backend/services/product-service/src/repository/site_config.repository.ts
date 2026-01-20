import { Prisma, prisma, PrismaRepository, Site_config } from "@multi-vendor-e-commerce/common";


export class SiteConfigRepository extends PrismaRepository<
    Site_config,
    Prisma.Site_configCreateInput,
    Prisma.Site_configUpdateInput,
    Prisma.Site_configWhereInput,
    Prisma.Site_configWhereUniqueInput,
    Prisma.Site_configOmit,
    Prisma.Site_configSelect,
    Prisma.Site_configOrderByWithRelationInput
> {
    constructor() {
        super(prisma.site_config);
    }

    async findFirst(): Promise<Site_config> {
        return this.findFirst();
    }


}