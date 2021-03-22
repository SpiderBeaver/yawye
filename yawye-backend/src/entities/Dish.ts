import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ingredient } from './Ingredient';

@Entity()
export class Dish {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  name: string = '';

  @ManyToMany(() => Ingredient, (ingredient) => ingredient.dishes)
  @JoinTable()
  ingredients: Ingredient[] | null = null;

  @Column()
  servingWeight: number = 0;
}
