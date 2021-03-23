import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Dish } from './Dish';
import { Ingredient } from './Ingredient';

@Entity()
export class DishIngredient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  dishId!: number;

  @ManyToOne(() => Dish, (dish) => dish.ingredients)
  dish: Dish | null = null;

  @Column()
  ingredientId!: number;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.dishes)
  ingredient: Ingredient | null = null;

  @Column()
  weight!: number;
}
