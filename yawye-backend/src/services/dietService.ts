import { Dayjs } from 'dayjs';
import { Between, FindOperator, getConnection } from 'typeorm';
import { Serving } from '../entities/Serving';

export default {
  async getCourses(date: Dayjs): Promise<Serving[]> {
    const connection = getConnection();
    const repository = connection.getRepository(Serving);
    // TODO: Chack that it works correctly with different timezones
    const servings = await repository.find({ date: Between(date, date.add(1, 'day')) });
    return servings;
  },
};
