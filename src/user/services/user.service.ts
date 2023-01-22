import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { UserDTO } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";

export class UserService extends BaseService<UserEntity> {
    constructor(){
        super(UserEntity);
    }

    async findAllUsers(): Promise<UserEntity[]>{
        return (await this.execRespository).find()
    }

    async findUserById(id: string): Promise<UserEntity | null>{
        return (await this.execRespository).findOneBy({ id })
    }

    async findUserWithRelation(id: string): Promise<UserEntity | null>{
        return (await this.execRespository)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.customer','customer')
        .where({ id }).getOne();
    }

    async createUser(body: UserDTO): Promise<UserEntity>{
        return (await this.execRespository).save(body)
    }

    async deleteUser(id: string): Promise<DeleteResult> {
        return (await this.execRespository).delete({ id })
    }
    
    async updateUser(id: string, infoUpdate: UserDTO): Promise<UpdateResult>{
        return (await this.execRespository).update(id, infoUpdate)
    }
}