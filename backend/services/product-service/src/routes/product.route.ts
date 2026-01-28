import { upload } from "@/config/multer";
import { ProductController } from "@/controllers/product.controller";
import { DiscountCodeRepository } from "@/repository/discountCode.repository";
import { ProductRepository } from "@/repository/product.repository";
import { SiteConfigRepository } from "@/repository/site_config.repository";
import { ProductService } from "@/services/product.services";
import { createDiscountSchema } from "@/validation/discountCode.validation";
import { asyncHandler, validateRequest } from "@multi-vendor-e-commerce/common";
import { Router } from "express";

const productRepository = new ProductRepository();
const discountCodeProduct = new DiscountCodeRepository();
const siteConfigRepository = new SiteConfigRepository();
const productServices = new ProductService(discountCodeProduct, productRepository, siteConfigRepository);
const controller = new ProductController(productServices);


const router: Router = Router();

router.route('/create-discount').post(validateRequest({ body: createDiscountSchema.shape.body }))
router.route('/upload-file').post(upload.single("file"), asyncHandler(controller.uploadFile.bind(controller)))


export default router;
