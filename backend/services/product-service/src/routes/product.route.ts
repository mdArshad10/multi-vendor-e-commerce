import { upload } from "@/config/multer";
import { ProductController } from "@/controllers/product.controller";
import { DiscountCodeRepository } from "@/repository/discountCode.repository";
import { ProductRepository } from "@/repository/product.repository";
import { SiteConfigRepository } from "@/repository/site_config.repository";
import { DiscountCodeService } from "@/services/discount_code.services";
import { ProductService } from "@/services/product.services";
import { createDiscountSchema } from "@/validation/discountCode.validation";
import { asyncHandler, validateRequest } from "@multi-vendor-e-commerce/common";
import { Router } from "express";

const productRepository = new ProductRepository();
const discountCodeProduct = new DiscountCodeRepository();
const siteConfigRepository = new SiteConfigRepository();
const productServices = new ProductService(productRepository, siteConfigRepository);
const discountCodeService = new DiscountCodeService(discountCodeProduct)
const controller = new ProductController(productServices, discountCodeService);


const router: Router = Router();

router.route('/discount-code')
    .get(asyncHandler(controller.getAllDiscountCodes.bind(controller)))

router.route('/create-discount-code')
    .post(validateRequest({ body: createDiscountSchema.shape.body }), asyncHandler(controller.createDiscountCode.bind(controller)))
router.route('/upload-file').post(upload.single("file"), asyncHandler(controller.uploadFile.bind(controller)))

router.route('/').post()

export default router;
