import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DishIngredient } from './DishIngredient';

@Entity()
export class Dish {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  name: string = '';

  @OneToMany(() => DishIngredient, (dishIngredient) => dishIngredient.dish)
  ingredients: DishIngredient[] | null = null;

  @Column()
  numberOfServings: number = 0;
}
