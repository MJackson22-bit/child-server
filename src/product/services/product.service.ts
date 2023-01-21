import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { ProductDTO } from "../dto/product.dto";
import { ProductEntity } from "../entities/product.entity";

export class ProductService extends BaseService<ProductEntity> {
    constructor() {
        super(ProductEntity);
    }

    async findAllProducts(): Promise<ProductEntity[]> {
        return (await this.execRespository).find()
    }

    async findProductById(id: string): Promise<ProductEntity | null> {
        return (await this.execRespository).findOne({ 
            where: { id: id }
        })
    }

    async createProduct(body: ProductEntity): Promise<ProductEntity> {
        return (await this.execRespository).save(body)
    }

    async deleteProduct(id: string): Promise<DeleteResult> {
        return (await this.execRespository).delete({ id })
    }

    async updateProduct(id: string, infoUpdate: ProductDTO): Promise<UpdateResult> {
        return (await this.execRespository).update(id, infoUpdate)
    }
}