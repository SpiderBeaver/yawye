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

  async updateIngredient(id: number, name: string, caloriees: number) {
    const repository = getRepository(Ingredient);
    const ingredient = await repository.findOne(id);
    if (ingredient === undefined) {
      throw new Error(`Ingredient with Id=${id} not found.`);
    }
    ingredient.name = name;
    ingredient.calories = caloriees;
    repository.save(ingredient);
    return ingredient;
  },
};
