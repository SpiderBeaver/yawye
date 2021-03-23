import { Request, Response } from 'express';
import dishesService from '../services/dishesService';

export default {
  async getDishes(req: Request, res: Response) {
    const dishes = await dishesService.getDishes();
    return res.json(dishes);
  },
};
