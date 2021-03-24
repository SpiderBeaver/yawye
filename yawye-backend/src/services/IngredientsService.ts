import { getConnection, getRepository } from 'typeorm';
import { Ingredient } from '../entities/Ingredient';

export default {
  async getIngredients(): Promise<Ingredient[]> {
    const repository = getRepository(Ingredient);
    const ingredients = await repository.find();
    return ingredients;
  },
};
