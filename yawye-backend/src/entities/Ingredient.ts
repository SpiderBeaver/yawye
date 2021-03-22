import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Dish } from './Dish';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  name: string = '';

  @Column()
  calories: number = 0;

  @ManyToMany(() => Dish, (dish) => dish.ingredients)
  dishes: Dish[] | null = null;
}
