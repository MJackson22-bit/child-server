import { Response, Request } from "express";
import { DeleteResult, UpdateResult } from "typeorm";
import { HttpResponse } from "../../shared/response/http.response";
import { PurchaseService } from "../services/purchase.service";

export class PurchaseController {
    constructor(
        private readonly puchaseService: PurchaseService = new PurchaseService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {
    }

    async getPurchases(req: Request, res: Response) {
        try {
            const data = await this.puchaseService.findAllPurchases();
            if (data.length === 0) {
                return this.httpResponse.NotFound(res, 'Puchase not Found');
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            this.httpResponse.Error(res, error);
        }
    }

    async getPurchaseById(req: Request, res: Response) {
        const {id} = req.params;
        try {
            const data = await this.puchaseService.findPurchaseById(id);
            if (!data) {
                return this.httpResponse.NotFound(res, 'Purchase not found');
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error)
        }
    }

    async createPurchase(req: Request, res: Response) {
        try {
            const data = await this.puchaseService.createPurchase(req.body)
            this.httpResponse.Ok(res, data);
        } catch (error) {
            this.httpResponse.Error(res, error);
        }
    }

    async updatePurchase(req: Request, res: Response) {
        const {id} = req.params
        try {
            const data: UpdateResult = await this.puchaseService.updatePurchase(id, req.body)
            if (!data.affected) {
                return this.httpResponse.NotFound(res, "Error updating purchase")
            }
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            return this.httpResponse.Error(res, error)
        }
    }

    async deletePurchase(req: Request, res: Response) {
        const {id} = req.params
        try {
            const data: DeleteResult = await this.puchaseService.deletePurchase(id)
            if (!data.affected) {
                return this.httpResponse.NotFound(res, "Error deleting purchase")
            }
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            return this.httpResponse.Error(res, error)
        }
    }
}
