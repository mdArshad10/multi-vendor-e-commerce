import { ProductService } from "@/services/product.services";
import { HttpResponse } from "@multi-vendor-e-commerce/common";
import { NextFunction, Request, Response } from "express";
import fs from 'fs'

export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) { }

    async createProduct(req: Request, res: Response, next: NextFunction) {
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

    async uploadFile(req: Request, res: Response, next: NextFunction) {
        try {

            const file = await this.productService.uploadImageFile(req.file);
            console.log(file);
            res.status(200).json(
                new HttpResponse("file upload successfully", 200, null)
            )
        } catch (error) {
            if (req.file?.path) {
                fs.unlinkSync(req.file?.path)
            }
            next(error)
        }
    }

    async deleteFile(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.body.fileId;
        } catch (error) {
            next(error)
        }
    }
}