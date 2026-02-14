import { Router } from 'express';

import {
  getHomepage,
  getAboutPage,
  getShippingPage,
  getContactPage,
  getReturnsPage,
  getBrandsPage,
  getAddFormController,
  postAddFormController,
} from '../controllers/generalControllers.js';

export const generalRoute = Router();

generalRoute.get('/', getHomepage);
generalRoute.get('/about', getAboutPage);
generalRoute.get('/shipping', getShippingPage);
generalRoute.get('/contact', getContactPage);
generalRoute.get('/returns', getReturnsPage);
generalRoute.get('/brands', getBrandsPage);
generalRoute
  .route('/add')
  .get(getAddFormController)
  .post(postAddFormController);
