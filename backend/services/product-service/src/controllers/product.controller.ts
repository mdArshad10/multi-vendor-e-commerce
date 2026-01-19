import { ProductService } from "@/services/product.services";

export class ProductController{
    constructor(
        private readonly productService:ProductService
    ){ }
}