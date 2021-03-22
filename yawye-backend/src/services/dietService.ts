import { Dayjs } from 'dayjs';
import { Course } from '../entities/Course';

export default {
  getCourses(date: Dayjs): Course[] {
    // TODO: Fetch from DB
    return [
      { id: 1, name: 'Pizza' },
      { id: 2, name: 'Soup' },
    ];
  },
};
