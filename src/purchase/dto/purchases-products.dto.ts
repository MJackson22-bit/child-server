import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class PurchasesProductsDTO extends BaseDTO {
    @IsNotEmpty()
    quantityProduct!: number;

    @IsNotEmpty()
    totalPrice!: number;
}