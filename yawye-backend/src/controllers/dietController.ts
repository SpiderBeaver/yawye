import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Request, Response } from 'express';
import dietService, { AddServingParams } from '../services/dietService';

dayjs.extend(customParseFormat);

export default {
  async getDiet(req: Request<{ date: string }>, res: Response) {
    const { date: dateString } = req.params;
    const date = dayjs(dateString, 'YYYY-MM-DD');
    if (!date.isValid()) {
      return res.status(400).send();
    }
    const servings = await dietService.getServings(date);
    res.json(servings);
  },

  async addServing(req: Request, res: Response) {
    // TODO: try/catch
    // TODO: validation
    // TODO: validate that weight is int
    const { date: dateString, dishId, weight }: { date: string; dishId: number; weight: number } = req.body;
    const date = dayjs(dateString);
    const serving = await dietService.addServing({ date, dishId, weight });
    return res.json(serving);
  },
};
