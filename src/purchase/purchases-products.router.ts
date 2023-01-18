import { BaseRouter } from "../shared/router/router";
import { PurchasesProductsController } from "./controllers/purchases-products.controller";

export class PurchasesProductsRouter extends BaseRouter<PurchasesProductsController> {
    constructor() {
        super(PurchasesProductsController);
    }

    routes(): void {
        this.router.get('user/purchasesProducts', (req, res) => this.controller.getPurchasesProducts(req, res));
        this.router.get('user/purchasesProducts/:id', (req, res) => this.controller.getPurchasesProductsById(req, res));
        this.router.post('user/createPurchasesProducts', (req, res) => this.controller.createPurchasesProducts(req, res));
        this.router.put('user/updatePurchasesProducts', (req, res) => this.controller.updatePurchasesProducts(req, res));
        this.router.delete('user/deletePurchasesProducts', (req, res) => this.controller.deletePurchasesProducts(req, res));
    }
}