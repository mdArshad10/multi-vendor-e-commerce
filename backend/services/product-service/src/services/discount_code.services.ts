import { DiscountCodeRepository } from "@/repository/discountCode.repository";
import { createDiscountCodeDto } from "@/validation/discountCode.validation";
import { ErrorHandler, ValidationError } from "@multi-vendor-e-commerce/common";

export class DiscountCodeService {
    constructor(
        private readonly discountCodeRepository: DiscountCodeRepository,
    ) { }

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

}