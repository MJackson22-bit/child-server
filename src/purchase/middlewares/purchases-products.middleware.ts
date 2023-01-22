import { validate } from "class-validator";
import { NextFunction, Response, Request } from "express";
import { HttpResponse } from "../../shared/response/http.response";
import { PurchasesProductsDTO } from "../dto/purchases-products.dto";

export class PurchaseProductMiddleware {
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()){}
    purchaseProductValidator(req: Request, res: Response, next: NextFunction){
        const { quantityProduct, totalPrice, product, purchase } = req.body

        const valid = new PurchasesProductsDTO()
        valid.quantityProduct = quantityProduct;
        valid.totalPrice = totalPrice;
        valid.product = product;
        valid.purchase = purchase;

        validate(valid).then((err) => {
            if(err.length > 0) {
                return this.httpResponse.Error(res, err)
            } else {
                next();
            }
        })
    }
}