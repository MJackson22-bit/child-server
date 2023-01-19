import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { CustomerDTO } from "../dto/customer.dto";
import { CustomerEntity } from "../entities/customer.entity";

export class CustomerService extends BaseService<CustomerEntity> {
    constructor(){
        super(CustomerEntity);
    }

    async findAllCustomers(): Promise<CustomerEntity[]>{
        return (await this.execRespository).find()
    }

    async findCustomerById(id: string): Promise<CustomerEntity | null>{
        return (await this.execRespository).findOne({
            where: { id: id }
        })
    }

    async createCustomer(body: CustomerDTO): Promise<CustomerEntity> {
        return (await this.execRespository).save(body)
    }

    async deleteCustomer(id: string): Promise<DeleteResult> {
        return (await this.execRespository).delete({ id })
    }

    async updateCustomer(id: string, infoUpdate: CustomerDTO): Promise<UpdateResult> {
        return (await this.execRespository).update(id, infoUpdate)
    }
}