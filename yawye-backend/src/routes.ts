import express from 'express';
import dietController from './controllers/dietController';
import dishesController from './controllers/dishesController';
import ingreientsController from './controllers/ingreientsController';

const router = express.Router();

router.get('/diet/:date', dietController.getDiet);
router.post('/diet/addServing', dietController.addServing);
router.get('/dishes', dishesController.getDishes);
router.get('/ingredients', ingreientsController.getIngredients);

export default router;
