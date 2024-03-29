import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { CategoryEntity } from "../entities/category.entity";

export class CategoryService extends BaseService<CategoryEntity> {
    constructor(){
        super(CategoryEntity)
    }

    async findAllCategories(): Promise<CategoryEntity[]>{
        return (await this.execRepository).find()
    }

    async findByCategoryId(id: string): Promise<CategoryEntity | null>{
        return (await this.execRepository).findOneBy({ id })
    }

    async createCategory(body: CategoryEntity): Promise<CategoryEntity> {
        return (await this.execRepository).save(body)
    }

    async deleteCategory(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id })
    }

    async updateCategory(id: string, body: CategoryEntity): Promise<UpdateResult> {
        return (await this.execRepository).update(id, body)
    }
}