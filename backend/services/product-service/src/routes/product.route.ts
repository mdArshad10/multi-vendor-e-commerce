import { ProductController } from "@/controllers/product.controller";
import { DiscountCodeRepository } from "@/repository/discountCode.repository";
import { ProductRepository } from "@/repository/product.repository";
import { ProductService } from "@/services/product.services";
import { asyncHandler, validateRequest } from "@multi-vendor-e-commerce/common";
import { Router } from "express";

const product = new ProductRepository();
const discountCodeProduct = new DiscountCodeRepository();
const productServices = new ProductService();
const controller = new ProductController(productServices);


const router: Router = Router();



export default router;
