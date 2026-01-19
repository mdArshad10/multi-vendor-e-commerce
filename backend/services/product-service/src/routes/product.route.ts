import { ProductController } from "@/controllers/product.controller";
import { ProductRepository } from "@/repository/product.repository";
import { ProductService } from "@/services/product.services";
import { asyncHandler, validateRequest } from "@multi-vendor-e-commerce/common";
import { Router } from "express";

const product = new ProductRepository();
const services = new ProductService();
const controller = new ProductController(services);


const router: Router = Router();



export default router;
