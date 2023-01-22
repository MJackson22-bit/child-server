import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";
import { HttpResponse } from "../../shared/response/http.response";
import { ProductService } from "../services/product.service";

export class ProductController {
    constructor(
        private readonly productService: ProductService = new ProductService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ){}

    async getProducts(req: Request, res: Response){
        try {
            const data = await this.productService.findAllProducts()
            if(data.length == 0){
                return this.httpResponse.NotFound(res, "Product not found")
            }
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            return this.httpResponse.Error(res, error)
        }
    }

    async getProductById(req: Request, res: Response){
        const { id } = req.params
        try {
            const data = await this.productService.findProductById(id)
            if(!data) {
                return this.httpResponse.NotFound(res, 'Product not found')
            }
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            return this.httpResponse.Error(res, error)
        }
    }

    async createProduct(req: Request, res: Response) {
        try {
            const data = await this.productService.createProduct(req.body)
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            return this.httpResponse.Error(res, error)
        }
    }

    async updateProduct(req: Request, res: Response) {
        const { id } = req.params
        try {
            const data: UpdateResult = await this.productService.updateProduct(id, req.body)
            if(!data.affected){
                return this.httpResponse.NotFound(res, 'Error updating product')
            }
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            return this.httpResponse.Error(res, error)
        }
    }

    async deleteProduct(req: Request, res: Response) {
        const { id } = req.params
        try {
            const data: DeleteResult = await this.productService.deleteProduct(id)
            if(data.affected){
                return this.httpResponse.NotFound(res, "Error deleting product")
            }
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            return this.httpResponse.Error(res, error)
        }
    }
}