import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { PurchasesProductsDTO } from "../dto/purchases-products.dto";
import { PurchasesProductsEntity } from "../entities/purchases-products.entity";

export class PurchasesProductsService extends BaseService<PurchasesProductsEntity> {
  constructor() {
    super(PurchasesProductsEntity);
  }

  async findAllPurchasesProducts(): Promise<PurchasesProductsEntity[]> {
    return (await this.execRespository).find();
  }

  async findPurchasesProductsByProductId(
    id: string
  ): Promise<PurchasesProductsEntity | null> {
    return (await this.execRespository).findOneBy({ id });
  }

  async createPurchaseProducts(body: PurchasesProductsDTO): Promise<PurchasesProductsEntity> {
    return (await this.execRespository).save(body)
  }

  async deletePurchasesProducts(id: string): Promise<DeleteResult> {
    return (await this.execRespository).delete({ id })
  }

  async updatePurchasesProducts(id: string, infoUpdate: PurchasesProductsDTO): Promise<UpdateResult> {
    return (await this.execRespository).update(id, infoUpdate)
  }
}
