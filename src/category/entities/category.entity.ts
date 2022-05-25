import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
  })
  updateAt?: Date;

  @Column({ length: 8, unique: true })
  code: string;

  @Column({ length: 150 })
  name: string;

  @Column({ nullable: true })
  details: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
