import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { PurchaseDTO } from "../dto/purchase.dto";
import { PurchaseEntity } from "../entities/purchase.entity";

export class PurchaseService extends BaseService<PurchaseEntity> {
    constructor() {
        super(PurchaseEntity)
    }

    async findAllPurchases(): Promise<PurchaseEntity[]> {
        return (await this.execRespository).find()
    }

    async findPurchaseById(id: string): Promise<PurchaseEntity | null> {
        return (await this.execRespository).findOne({
            where: { id: id }
        })
    }

    async createPurchase(body: PurchaseDTO): Promise<PurchaseEntity> {
        return (await this.execRespository).save(body)
    }

    async deletePurchase(id: string): Promise<DeleteResult> {
        return (await this.execRespository).delete({ id })
    }

    async updatePurchase(id: string, infoUpdate: PurchaseDTO): Promise<UpdateResult> {
        return (await this.execRespository).update(id, infoUpdate)
    }
}