import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { PurchasesProductsEntity } from "../../custom/entities/purchases-products.entity";
import { CustomerEntity } from "../../customer/entities/customer.entity";

@Entity({ name: "purchase" })
export class PurchaseEntity extends BaseEntity {
    @Column()
    status!: string;

    @Column()
    paymentMethod!: string;

    @ManyToOne(() => CustomerEntity, (customer) => customer.purchases)
    @JoinColumn({ name: "customer_id" })
    customer!: CustomerEntity;

    @OneToMany(() => PurchasesProductsEntity, (purchaseProducts) => purchaseProducts.purchase)
    purchaseProducts!: PurchasesProductsEntity[];
    
}