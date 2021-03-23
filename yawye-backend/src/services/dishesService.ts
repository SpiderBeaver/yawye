import { getConnection } from 'typeorm';
import { Dish } from '../entities/Dish';

export default {
  async getDishes(): Promise<Dish[]> {
    const connection = getConnection();
    const repository = connection.getRepository(Dish);
    const dishes = await repository.find({ relations: ['ingredients'] });
    return dishes;
  },
};
