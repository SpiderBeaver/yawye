import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Dish } from './Dish';

@Entity()
export class Serving {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @ManyToOne(() => Dish)
  @JoinColumn()
  dish: Dish | null = null;

  @Column()
  dishId: number = 0;

  @Column()
  weight: number = 0;
}
