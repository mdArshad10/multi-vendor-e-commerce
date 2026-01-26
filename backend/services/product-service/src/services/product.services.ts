import { DiscountCodeRepository } from "@/repository/discountCode.repository";
import { ProductRepository } from "@/repository/product.repository";
import { SiteConfigRepository } from "@/repository/site_config.repository";
import { createDiscountCodeDto } from "@/validation/discountCode.validation";
import { createProductSchemaValidationDto } from "@/validation/product.validation";
import { ErrorHandler, imageKit, imageKitClient, Site_config, ValidationError } from "@multi-vendor-e-commerce/common";

export class ProductService {
    constructor(
        private readonly discountCodeRepository: DiscountCodeRepository,
        private readonly productRepository: ProductRepository,
        private readonly siteConfigRepository: SiteConfigRepository
    ) { }

    async getCategories(): Promise<Site_config> {
        const categories = await this.siteConfigRepository.findFirst();
        if (!categories) {
            new ErrorHandler("Categories not found", 404)
        }
        return categories;
    }


    async createDiscountCode(body: createDiscountCodeDto, sellerId: string) {
        const isDiscountCodeExist = await this.discountCodeRepository.findOne({
            discountCode: body.discountCode
        })
        if (isDiscountCodeExist) {
            throw new ValidationError("this discount code is already exist")
        }
        const code = await this.discountCodeRepository.create({
            discountCode: body.discountCode,
            discountType: body.discountType,
            public_name: body.public_name,
            discountValue: body.discountValue,
            sellerId: sellerId
        })
        return code;
    }

    async getAllDiscountCodes(sellerId: string) {
        return await this.discountCodeRepository.findMany({
            where: {
                sellerId: sellerId
            }
        })
    }

    async deleteDiscountCode(codeId: string, seller: string) {
        const discountCode = await this.discountCodeRepository.findById({ id: codeId },
            {
                select: { id: true, sellerId: true }
            }
        );

        if (discountCode?.sellerId !== seller) {
            throw new ValidationError("Unauthorized access!")
        }


        const deletedDiscount = await this.discountCodeRepository.delete({
            sellerId: seller,
            id: codeId
        })
        if (!deletedDiscount) {
            throw new ErrorHandler('discount code is not exist', 404)
        }
        return true
    }

    async uploadImageFile(File: any) {
        const response = await imageKitClient.files.upload({
            file: File,
            fileName: `product-${File}.jpg`,
            folder: '/product'
        })
        return response;
    }
    async deleteImageFile(fileId: string) {
        const response = await imageKitClient.files.delete(fileId);
        return response;
    }

    async createProduct(body: createProductSchemaValidationDto) {

    }

    // async getShopProducts(shopId: string) {
    //     const product = await this.productRepository.findMany({
    //         where: { shopId: shopId },
    //         include: { images: true }
    //     })
    //     return product;
    // }
}