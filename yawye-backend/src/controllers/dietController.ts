import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Request, Response } from 'express';
import dietService from '../services/dietService';

dayjs.extend(customParseFormat);

interface AddServingParams {
  date: string;
  dishId: number;
  weight: number;
}

interface ServingDto {
  id: number;
  dishId: number;
  weight: number;
}

export default {
  async getDiet(req: Request<{ date: string }>, res: Response<ServingDto[]>) {
    const { date: dateString } = req.params;
    const date = dayjs(dateString, 'YYYY-MM-DD');
    if (!date.isValid()) {
      return res.status(400).send();
    }
    const servings = await dietService.getServings(date);
    const servingsDto = servings.map(
      (serving) =>
        ({
          id: serving.id,
          dishId: serving.dishId,
          weight: serving.weight,
        } as ServingDto)
    );
    res.json(servingsDto);
  },

  async addServing(req: Request<any, any, AddServingParams>, res: Response<ServingDto>) {
    // TODO: try/catch
    // TODO: validation
    // TODO: validate that weight is int
    const { date: dateString, dishId, weight } = req.body;
    const date = dayjs(dateString);
    const serving = await dietService.addServing(date, dishId, weight);
    if (serving === undefined) {
      return res.status(400);
    }
    const servingDto = {
      id: serving.id,
      dishId: serving.dishId,
      weight: serving.weight,
    } as ServingDto;
    return res.json(servingDto);
  },
};
