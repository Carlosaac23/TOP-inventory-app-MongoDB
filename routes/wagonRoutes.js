import { Router } from 'express';

import {
  getAllWagonsController,
  getWagonByIdController,
  getAddFormController,
  postAddFormController,
  getUpdateFormController,
  putUpdateFormController,
  deleteWagonController,
} from '../controllers/wagonControllers.js';
import { adminPassword } from '../middleware/auth.js';

export const wagonRoutes = Router();

wagonRoutes.get('/', getAllWagonsController);
wagonRoutes
  .route('/add')
  .get(getAddFormController)
  .post(adminPassword, postAddFormController);
wagonRoutes
  .route('/:wagonID/update')
  .get(getUpdateFormController)
  .put(adminPassword, putUpdateFormController);
wagonRoutes.get('/:wagonID', getWagonByIdController);
wagonRoutes.delete('/:wagonID/delete', deleteWagonController);
