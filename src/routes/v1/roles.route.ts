import express, { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { RolesController } from '../../controllers';

import auth from '../../middlewares/auth';

const router: Router = express.Router();

router.route('/')
.post(asyncHandler(auth), asyncHandler(RolesController.create))
.get(asyncHandler(auth), asyncHandler(RolesController.get))
.patch(asyncHandler(auth), asyncHandler(RolesController.update))
.delete(asyncHandler(auth), asyncHandler(RolesController.delete));

export default router;