import { IsNotEmpty, IsOptional } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { ProductEntity } from "../../product/entities/product.entity";
import { PurchaseEntity } from "../entities/purchase.entity";

export class PurchasesProductsDTO extends BaseDTO {
  @IsNotEmpty()
  quantityProduct!: number;

  @IsNotEmpty()
  totalPrice!: number;

  @IsOptional()
  purchase?: PurchaseEntity;

  @IsOptional()
  product?: ProductEntity;
}
