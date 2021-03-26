import { Request, Response } from 'express';
import IngredientsService from '../services/IngredientsService';

interface IngredientDto {
  id: number;
  name: string;
  calories: number;
}

interface CreateIngredientParameters {
  name: string;
  calories: number;
}

interface UpdateIngredientParameters {
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

  async addIngredient(req: Request, res: Response) {
    // TODO: validate
    // TODO: Check if exists
    const parameters = req.body as CreateIngredientParameters;
    const ingredient = await IngredientsService.addIngredient(parameters.name, parameters.calories);
    const ingredientDto = {
      id: ingredient.id,
      name: ingredient.name,
      calories: ingredient.calories,
    } as IngredientDto;
    return res.json(ingredientDto);
  },

  async updateIngredient(req: Request, res: Response) {
    const parameteres = req.body as UpdateIngredientParameters;
    const ingredient = await IngredientsService.updateIngredient(
      parameteres.id,
      parameteres.name,
      parameteres.calories
    );
    const ingredientDto = {
      id: ingredient.id,
      name: ingredient.name,
      calories: ingredient.calories,
    } as IngredientDto;
    return res.json(ingredientDto);
  },
};
