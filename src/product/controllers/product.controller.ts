import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

export class ProductController {
    constructor(private readonly productService: ProductService = new ProductService()){}

    async getProducts(req: Request, res: Response){
        try {
            const data = await this.productService.findAllProducts()
            res.status(200).json(data)
        } catch (error) {
            console.error(error)
        }
    }

    async getProductById(req: Request, res: Response){
        const { id } = req.params
        try {
            const data = await this.productService.findProductById(id)
        } catch (error) {
            console.error(error)
        }
    }

    async createProduct(req: Request, res: Response) {
        try {
            const data = await this.productService.createProduct(req.body)
            res.status(200).json(data)
        } catch (error) {
            console.error(error)
        }
    }

    async updateProduct(req: Request, res: Response) {
        const { id } = req.params
        try {
            const data = await this.productService.updateProduct(id, req.body)
        } catch (error) {
            console.error(error)
        }
    }

    async deleteProduct(req: Request, res: Response) {
        const { id } = req.params
        try {
            const data = await this.productService.deleteProduct(id)
            res.status(200).json(data)
        } catch (error) {
            console.error(error)
        }
    }
}