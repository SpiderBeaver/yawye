import { Request, Response } from 'express';
import dishesService from '../services/dishesService';

interface DishIngredientDto {
  ingredientId: number;
  weight: number;
}

interface DishDto {
  id: number;
  name: string;
  numberOfServings: number;
  ingredients: DishIngredientDto[];
}

export default {
  async getDishes(req: Request, res: Response<DishDto[]>) {
    const dishes = await dishesService.getDishes();
    const dishesDto = dishes.map(
      (dish) =>
        ({
          id: dish.id,
          name: dish.name,
          numberOfServings: dish.numberOfServings,
          ingredients: dish.ingredients!.map(
            (dishIngredient) =>
              ({
                ingredientId: dishIngredient.ingredientId,
                weight: dishIngredient.weight,
              } as DishIngredientDto)
          ),
        } as DishDto)
    );
    return res.json(dishesDto);
  },
};
