import { EntityTarget, Repository } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ConfigServer } from "./config";

export class BaseService<T extends BaseEntity> extends ConfigServer {
    public execRespository: Promise<Repository<T>>

    constructor(private getEntity: EntityTarget<T>) {
        super()
        this.execRespository = this.initRepository(getEntity)
    }

    async initRepository(entity: EntityTarget<T>): Promise<Repository<T>> {
        const getConnection = await this.dbConnect()
        return getConnection.getRepository(entity)
    }
}