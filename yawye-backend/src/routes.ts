import express from 'express';
import dietController from './controllers/dietController';

const router = express.Router();

router.get('/diet/:date', dietController.getDiet);

export default router;
