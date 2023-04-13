import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import * as bcrypt from "bcrypt";
import { UserDTO } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";

export class UserService extends BaseService<UserEntity> {
    constructor(){
        super(UserEntity);
    }

    async findAllUsers(): Promise<UserEntity[]>{
        return (await this.execRepository).find()
    }

    async findUserById(id: string): Promise<UserEntity | null>{
        return (await this.execRepository).findOneBy({ id })
    }

    async findUserByEmail(email: string): Promise<UserEntity | null> {
        return (await this.execRepository)
        .createQueryBuilder("user")
        .addSelect("user.email")
        .where({ email })
        .getOne();
    }

    async findUserByUsername(username: string): Promise<UserEntity | null> { 
        return (await this.execRepository)
        .createQueryBuilder("user")
        .addSelect("user.username")
        .where({ username })
        .getOne();
    }   

    async createUser(body: UserDTO): Promise<UserEntity>{
        const newUser = (await this.execRepository).create(body);
        const hash = await bcrypt.hash(newUser.password, 10);
        newUser.password = hash;
        return (await this.execRepository).save(body)
    }

    async deleteUser(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id })
    }
    
    async updateUser(id: string, infoUpdate: UserDTO): Promise<UpdateResult>{
        return (await this.execRepository).update(id, infoUpdate)
    }
}