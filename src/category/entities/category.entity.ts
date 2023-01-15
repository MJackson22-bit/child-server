import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ProductEntity } from "../../product/entities/product.entity";

@Entity({ name: "category" })
export class CategoryEntity extends BaseEntity {
    @Column()
    categoryName!: string;

    @ManyToOne(() => ProductEntity, (product) => product.category)
    @JoinColumn({ name: "customer_id" })
    products!: ProductEntity;
    
}