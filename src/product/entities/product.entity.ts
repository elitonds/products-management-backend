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

  @Column({ length: 8 })
  code: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  detail: number;

  @OneToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
