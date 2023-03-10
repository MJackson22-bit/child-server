import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { PurchaseEntity } from "../../purchase/entities/purchase.entity";
import { UserEntity } from "../../user/entities/user.entity";

@Entity({ name: "customer" })
export class CustomerEntity extends BaseEntity {
    @Column()
    address!: string;

    @Column()
    dni!: number;
    
    @ManyToOne(() => PurchaseEntity, (purchase) => purchase.customer)
    @JoinColumn({ name: "customer_id" })
    purchases!: PurchaseEntity[];
    
}