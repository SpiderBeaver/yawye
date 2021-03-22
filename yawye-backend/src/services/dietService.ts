import { Dayjs } from 'dayjs';
import { Serving } from '../entities/Serving';

export default {
  getCourses(date: Dayjs): Serving[] {
    // TODO: Fetch from DB
    return [
      { id: 1, dish: null, weight: 100 },
      { id: 2, dish: null, weight: 150 },
    ];
  },
};
