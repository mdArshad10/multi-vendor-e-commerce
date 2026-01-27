import { ProductService } from "@/services/product.services";
import { HttpResponse } from "@multi-vendor-e-commerce/common";
import { NextFunction, Request, Response } from "express";

export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) { }

    async createProduct(req: Request, res: Response, next: NextFunction){
        try {
            //code
        } catch (error) {
            next(error);
        }
    }

    async getCategories(_req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await this.productService.getCategories();
            res.status(200).json(
                new HttpResponse("get Categories", 200, categories)
            )
        } catch (error) {
            next(error)
        }
    }

    async createDiscountCode(req: Request, res: Response, next: NextFunction) {
        try {
            const sellerId = req.user.id;
            const code = await this.productService.createDiscountCode(req.body, sellerId);
            res.status(201).json(
                HttpResponse.created(code, "Discount created successfully")
            )
        } catch (error) {
            next(error)
        }
    }

    async getDiscountCodes(req: Request, res: Response, next: NextFunction) {
        try {
            const sellerId = req.user.id;
            const codes = await this.productService.getAllDiscountCodes(sellerId);
            res.status(200).json(
                new HttpResponse("get all discount", 200, codes)
            )
        } catch (error) {
            next(error)
        }
    }

    async deleteDiscountCode(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user.id;
            const discountCodeId = req.params.discountId as string;
            await this.productService.deleteDiscountCode(discountCodeId, userId);
            res.status(200).json(
                HttpResponse.success(null, "delete discount successfully")
            )
        } catch (error) {
            next(error)
        }
    }
}