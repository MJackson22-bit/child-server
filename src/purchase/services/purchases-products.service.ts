import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { ProductService } from "../../product/services/product.service";
import { PurchasesProductsDTO } from "../dto/purchases-products.dto";
import { PurchasesProductsEntity } from "../entities/purchases-products.entity";

export class PurchasesProductsService extends BaseService<PurchasesProductsEntity> {
  constructor(
    private readonly productService: ProductService = new ProductService()
  ) {
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
    const newPurchaseProduct = (await this.execRespository).create(body)
    const product = await this.productService.findProductById(newPurchaseProduct.product.id);
    newPurchaseProduct.totalPrice = product!.price * newPurchaseProduct.quantityProduct
    return (await this.execRespository).save(newPurchaseProduct)
  }



  async deletePurchasesProducts(id: string): Promise<DeleteResult> {
    return (await this.execRespository).delete({ id })
  }

  async updatePurchasesProducts(id: string, infoUpdate: PurchasesProductsDTO): Promise<UpdateResult> {
    return (await this.execRespository).update(id, infoUpdate)
  }
}
