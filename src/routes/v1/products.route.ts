import express, { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { ProductsController } from '../../controllers';

import auth from '../../middlewares/auth';

const router: Router = express.Router();

router.route('/')
.post(asyncHandler(auth), asyncHandler(ProductsController.create))
.get(asyncHandler(auth), asyncHandler(ProductsController.get))
.patch(asyncHandler(auth), asyncHandler(ProductsController.update))
.delete(asyncHandler(auth), asyncHandler(ProductsController.delete));

export default router;