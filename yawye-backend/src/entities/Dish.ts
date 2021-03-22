import { Ingredient } from './Ingredient';

export class Dish {
  id: number = 0;
  name: string = '';
  ingredients: Ingredient[] = [];
  servingWeight: number = 0;
}
