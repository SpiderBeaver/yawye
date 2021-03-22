import { Request, Response } from 'express';
import IngredientsService from '../services/IngredientsService';

export default {
  getIngredients(req: Request, res: Response) {
    const ingredients = IngredientsService.GetIngredients();
    return res.json(ingredients);
  },
};
