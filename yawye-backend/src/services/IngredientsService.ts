import { getRepository } from 'typeorm';
import { Ingredient } from '../entities/Ingredient';

export default {
  async getIngredients() {
    const repository = getRepository(Ingredient);
    const ingredients = await repository.find();
    return ingredients;
  },

  async addIngredient(name: string, calories: number) {
    const repository = getRepository(Ingredient);
    const ingredient = repository.create({ name: name, calories: calories });
    repository.save(ingredient);
    return ingredient;
  },
};
