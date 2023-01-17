import { Response, Request } from "express";
import { PurchaseService } from "../services/purchase.service";

export class PurchaseController {
    constructor(
        private readonly puchaseService: PurchaseService = new PurchaseService()
    ) { }

    async getPurchases(req: Request, res: Response) {
        try {
            const data = await this.puchaseService.findAllPurchases();
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
        }
    }

    async getPurchaseById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.puchaseService.findPurchaseById(id);
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
        }
    }

    async createPurchase(req: Request, res: Response) {
        try{
            const data = await this.puchaseService.createPurchase(req.body)
            res.status(200).json(data);
        }catch (error) {
            console.log(error)
        }
    }

    async updatePurchase(req: Request, res: Response) {
        const {id } = req.params
        try {
            const data = await this.puchaseService.updatePurchase(id, req.body)
            res.status(200).json(data)
        } catch (error) {
            console.error(error)
        }
    }

    async deletePurchase(req: Request, res: Response) {
        const { id } = req.params
        try {
            const data = await this.puchaseService.deletePurchase(id)
            res.status(200).json(data)
        } catch (error) {
            console.error(error)
        }
    }
}
