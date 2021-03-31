import { Dayjs } from 'dayjs';
import { Dish } from '../models/Dish';
import Ingredient from '../models/Ingredient';
import Serving from '../models/Serving';

// TODO: Load from config/environment
const baseUrl = 'http://localhost:3001';

function fullUrl(relativeUrl: string) {
  return new URL(relativeUrl, baseUrl).href;
}

async function fetchPost(url: string, body: any) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  // TODO: check response status.
  const data = await response.json();
  return data;
}

const apiClient = {
  async getIngredients() {
    const response = await fetch(fullUrl('/ingredients'));
    const ingredients = (await response.json()) as Ingredient[];
    return ingredients;
  },

  async createIngredient(name: string, calories: number) {
    const body = { name, calories };
    const ingredient = (await fetchPost(fullUrl('/ingredients/add'), body)) as Ingredient;
    return ingredient;
  },

  async updateIngredient(id: number, name: string, calories: number) {
    const body = { id, name, calories };
    const ingredient = (await fetchPost(fullUrl('/ingredients/update'), body)) as Ingredient;
    return ingredient;
  },

  async getDishes() {
    const response = await fetch(fullUrl('/dishes'));
    const dishes = (await response.json()) as Dish[];
    return dishes;
  },

  async getDiet(date: Dayjs) {
    const dateString = date.format('YYYY-MM-DD');
    const response = await fetch(fullUrl(`/diet/${dateString}`));
    const servings = (await response.json()) as Serving[];
    return servings;
  },

  async addServing(date: Dayjs, dishId: number, weight: number) {
    const body = { date, dishId, weight: Math.trunc(weight) };
    const serving = (await fetchPost(fullUrl('/diet/addServing'), body)) as Serving;
    return serving;
  },
};

export default apiClient;
