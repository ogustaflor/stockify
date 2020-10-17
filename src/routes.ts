import { Router } from 'express';
import multer from 'multer';

import uploadConfiguration from './config/upload';

import CompaniesController from './app/controllers/CompaniesController';
import ProductsController from './app/controllers/ProductsController';

const routes = Router();
const upload = multer(uploadConfiguration);

routes.get('/companies', CompaniesController.index);
routes.post('/companies', CompaniesController.store);
routes.get('/companies/:id', CompaniesController.show);

routes.get('/products', ProductsController.index);
routes.post('/products', upload.single('picture'), ProductsController.store);
routes.get('/products/:id', ProductsController.show);

export default routes;