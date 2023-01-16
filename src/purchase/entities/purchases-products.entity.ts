import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ProductEntity } from "../../product/entities/product.entity";
import { PurchaseEntity } from "./purchase.entity";

@Entity({ name: "purchases_products" })
export class PurchasesProductsEntity extends BaseEntity {
    @Column()
    quantityProduct!: number;

    @Column()
    totalPrice!: number;

    @ManyToOne(() => PurchaseEntity, (purchase) => purchase.purchaseProducts)
    @JoinColumn({ name: "purchase_id" })
    purchase!: PurchaseEntity;

    @ManyToOne(() => ProductEntity, (product) => product.purchaseProducts)
    @JoinColumn({ name: "product_id" })
    product!: ProductEntity;

    
}