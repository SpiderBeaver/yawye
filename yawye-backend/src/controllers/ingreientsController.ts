import { Request, Response } from 'express';
import IngredientsService from '../services/IngredientsService';

interface IngredientDto {
  id: number;
  name: string;
  calories: number;
}

export default {
  async getIngredients(req: Request, res: Response<IngredientDto[]>) {
    const ingredients = await IngredientsService.getIngredients();
    const ingredientsDto = ingredients.map(
      (ingredient) =>
        ({
          id: ingredient.id,
          name: ingredient.name,
          calories: ingredient.calories,
        } as IngredientDto)
    );
    return res.json(ingredientsDto);
  },
};
