import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Request, Response } from 'express';
import dietService from '../services/dietService';

dayjs.extend(customParseFormat);

export default {
  async getDiet(req: Request<{ date: string }>, res: Response) {
    const { date: dateString } = req.params;
    const date = dayjs(dateString, 'YYYY-MM-DD');
    if (!date.isValid()) {
      return res.status(400).send();
    }
    const courses = await dietService.getCourses(date);
    res.json(courses);
  },
};
