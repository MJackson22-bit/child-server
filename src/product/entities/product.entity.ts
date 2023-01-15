import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { CategoryEntity } from "../../category/entities/category.entity";
import { BaseEntity } from "../../config/base.entity";
import { PurchasesProductsEntity } from "../../custom/entities/purchases-products.entity";
import { PurchaseEntity } from "../../purchase/entities/purchase.entity";
import { UserEntity } from "../../user/entities/user.entity";

@Entity({ name: "product" })
export class ProductEntity extends BaseEntity {
    @Column()
    productName!: string;

    @Column()
    description!: string;

    @Column()
    price!: number;

    @OneToOne(() => UserEntity, (user) => user.customer)
    @JoinColumn({ name: "user_id" })
    user!: UserEntity;

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    @JoinColumn({ name: "category_id" })
    category!: CategoryEntity;

    @OneToMany(() => PurchasesProductsEntity, (purchaseProducts) => purchaseProducts.product)
    purchaseProducts!: PurchasesProductsEntity[];
    
}