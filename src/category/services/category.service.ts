import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { CategoryEntity } from "../entities/category.entity";

export class CategoryService extends BaseService<CategoryEntity> {
    constructor(){
        super(CategoryEntity)
    }

    async findAllCategories(): Promise<CategoryEntity[]>{
        return (await this.execRespository).find()
    }

    async findByCategoryId(id: string): Promise<CategoryEntity | null>{
        return (await this.execRespository).findOneBy({ id })
    }

    async createCategory(body: CategoryEntity): Promise<CategoryEntity> {
        return (await this.execRespository).save(body)
    }

    async deleteCategory(id: string): Promise<DeleteResult> {
        return (await this.execRespository).delete({ id })
    }

    async updateCategory(id: string, body: CategoryEntity): Promise<UpdateResult> {
        return (await this.execRespository).update(id, body)
    }
}