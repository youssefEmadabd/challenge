import express, { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { UsersController } from '../../controllers';

import auth from '../../middlewares/auth';

const router: Router = express.Router();

router.route('/')
    .post(asyncHandler(auth), asyncHandler(UsersController.create))
    .get(asyncHandler(auth), asyncHandler(UsersController.get))
    .patch(asyncHandler(auth), asyncHandler(UsersController.update))
    .delete(asyncHandler(auth), asyncHandler(UsersController.delete));

router.post('/login', asyncHandler(UsersController.login));
router.post('/register/:role', asyncHandler(UsersController.register));
router.post('/deposit', asyncHandler(auth), asyncHandler(UsersController.deposit));
router.post('/buy/:productId', asyncHandler(auth), asyncHandler(UsersController.buy));
router.post('/reset', asyncHandler(auth), asyncHandler(UsersController.reset));

export default router;