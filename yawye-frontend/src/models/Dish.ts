export interface Dish {
  id: number;
  name: string;
  numberOfServings: number;
  ingredients: {
    ingredientId: number;
    weight: number;
  }[];
}
