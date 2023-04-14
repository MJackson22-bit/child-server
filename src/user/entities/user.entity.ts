import { Column, Entity, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { CustomerEntity } from "../../customer/entities/customer.entity";

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {
    @Column()
    username!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;
}