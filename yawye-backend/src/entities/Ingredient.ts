import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DishIngredient } from './DishIngredient';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  name: string = '';

  @Column()
  calories: number = 0;

  @OneToMany(() => DishIngredient, (dishIngredient) => dishIngredient.ingredient)
  dishes: DishIngredient[] | null = null;
}
