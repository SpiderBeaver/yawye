import express from 'express';
import dietController from './controllers/dietController';
import dishesController from './controllers/dishesController';
import ingreientsController from './controllers/ingreientsController';

const router = express.Router();

router.get('/diet/:date', dietController.getDiet);
router.get('/dishes', dishesController.getDishes);
router.get('/ingredients', ingreientsController.getIngredients);

export default router;
