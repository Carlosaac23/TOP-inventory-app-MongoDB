import { Router } from 'express';

import {
  getAllTrainsController,
  getTrainByIdController,
} from '../controllers/trainControllers.js';

export const trainRoutes = Router();

trainRoutes.get('/', getAllTrainsController);
trainRoutes.get('/:trainID', getTrainByIdController);
