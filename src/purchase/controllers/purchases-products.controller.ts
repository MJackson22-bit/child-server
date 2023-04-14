import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";
import { HttpResponse } from "../../shared/response/http.response";
import { PurchasesProductsService } from "../services/purchases-products.service";

export class PurchasesProductsController {
    constructor(
        private readonly purchasesProductsService: PurchasesProductsService = new PurchasesProductsService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {
    }

    async getPurchasesProducts(req: Request, res: Response) {
        try {
            const data = await this.purchasesProductsService.findAllPurchasesProducts();
            if (data.length == 0) {
                return this.httpResponse.NotFound(res, "Purchase Product Not Found")
            }
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            this.httpResponse.Error(res, error)
        }
    }

    async getPurchasesProductsById(req: Request, res: Response) {
        const {id} = req.params
        try {
            const data = await this.purchasesProductsService.findPurchasesProductsByProductId(id)
            if (!data) {
                return this.httpResponse.NotFound(res, 'Product not found')
            }
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            return this.httpResponse.Error(res, error)
        }
    }

    async createPurchasesProducts(req: Request, res: Response) {
        try {
            const data = await this.purchasesProductsService.createPurchaseProducts(req.body)
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            return this.httpResponse.Error(res, error)
        }
    }

    async updatePurchasesProducts(req: Request, res: Response) {
        const {id} = req.params
        try {
            const data: UpdateResult = await this.purchasesProductsService.updatePurchasesProducts(id, req.body)
            if (!data.affected) {
                return this.httpResponse.NotFound(res, "Error updating purchase product")
            }
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            return this.httpResponse.Error(res, error)
        }
    }

    async deletePurchasesProducts(req: Request, res: Response) {
        const {id} = req.params
        try {
            const data: DeleteResult = await this.purchasesProductsService.deletePurchasesProducts(id)
            if (!data.affected) {
                return this.httpResponse.NotFound(res, "Error deleting purchase product")
            }
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            return this.httpResponse.Error(res, error)
        }
    }
}