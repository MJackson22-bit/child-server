import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";
import { HttpResponse } from "../../shared/response/http.response";
import { CustomerService } from "../services/customer.service";

export class CustomerController {
    constructor(
        private readonly customerService: CustomerService = new CustomerService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ){}

    async getCustomers(req: Request, res: Response){
        try {
            const data = await this.customerService.findAllCustomers()
            if(data.length == 0){
                return this.httpResponse.NotFound(res, "Customer not found")
            }
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            return this.httpResponse.Error(res, error)
        }
    }

    async getCustomerById(req: Request, res: Response){
        const { id } = req.params
        try {
            const data = await this.customerService.findCustomerById(id)
            if(!data) {
                return this.httpResponse.NotFound(res, 'Customer not found')
            }
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            return this.httpResponse.Error(res, error)
        }
    }

    async createCustomer(req: Request, res: Response) {
        try {
            const data = await this.customerService.createCustomer(req.body)
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            return this.httpResponse.Error(res, error)
        }
    }

    async updateCustomer(req: Request, res: Response) {
        const { id } = req.params
        try {
            const data: UpdateResult = await this.customerService.updateCustomer(id, req.body)
            if(!data.affected){
                return this.httpResponse.NotFound(res, "Error updating customer")
            }
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            return this.httpResponse.Error(res, error)
        }
    }

    async deleteCustomer(req: Request, res: Response) {
        const { id } = req.params
        try {
            const data: DeleteResult = await this.customerService.deleteCustomer(id)
            if(!data.affected){
                return this.httpResponse.NotFound(res, "Error deleting customer")
            }
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            return this.httpResponse.Error(res, error)
        }
    }
}