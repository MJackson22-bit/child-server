import { BaseRouter } from "../shared/router/router";
import { PurchaseController } from "./controllers/purchase.controller";

export class PurchaseRouter extends BaseRouter<PurchaseController> {
    constructor() {
        super(PurchaseController);
    }

    routes(): void {
        this.router.get('/user/puchases', (req, res) => this.controller.getPurchases(req, res));
        this.router.get('/user/purchase/:id', (req, res) => this.controller.getPurchaseById(req, res));
        this.router.post('/user/createPurchase', (req, res) => this.controller.createPurchase(req, res));
        this.router.put('/user/updatePurchase/:id', (req, res) => this.controller.updatePurchase(req, res));
        this.router.delete('/user/deletePurchase/:id', (req, res) => this.controller.deletePurchase(req, res));
    }
}