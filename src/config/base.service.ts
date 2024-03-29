import { EntityTarget, Repository } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ConfigServer } from "./config";

export class BaseService<T extends BaseEntity> extends ConfigServer {
    public execRepository: Promise<Repository<T>>

    constructor(private getEntity: EntityTarget<T>) {
        super()
        this.execRepository = this.initRepository(getEntity)
    }

    async initRepository(entity: EntityTarget<T>): Promise<Repository<T>> {
        const getConnection = await this.initConnect
        return getConnection.getRepository(entity)
    }
}