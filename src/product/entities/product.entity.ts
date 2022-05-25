import { Category } from 'src/category/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product')
export class Product {
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

  @Column({ length: 250 })
  name: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'text' })
  detail: string;

  @Column({ name: 'category_id', nullable: false })
  categoryId: number;

  @OneToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
