import { Dayjs } from 'dayjs';
import { Between, FindOperator, getConnection } from 'typeorm';
import { Serving } from '../entities/Serving';

export interface AddServingParams {
  date: Dayjs;
  dishId: number;
  weight: number;
}

export default {
  async getServings(date: Dayjs): Promise<Serving[]> {
    const connection = getConnection();
    const repository = connection.getRepository(Serving);
    // TODO: Chack that it works correctly with different timezones
    const servings = await repository.find({ date: Between(date, date.add(1, 'day')) });
    return servings;
  },

  async addServing({ date, dishId, weight }: AddServingParams) {
    const connection = getConnection();
    const repository = connection.getRepository(Serving);
    const serving = repository.create({ date: date, dishId: dishId, weight: weight });
    await repository.save(serving);
    // For some reason TypeOrm sets dishId to null after calling save().
    // Workaround for now is to fetch the new serving manually.
    const newServing = await repository.findOne(serving.id);
    return newServing;
  },
};
