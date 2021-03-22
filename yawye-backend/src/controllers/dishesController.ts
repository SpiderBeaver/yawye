import { Request, Response } from 'express';
import dishesService from '../services/dishesService';

export default {
  getDishes(req: Request, res: Response) {
    const dishes = dishesService.getDishes();
    res.json(dishes);
  },
};
