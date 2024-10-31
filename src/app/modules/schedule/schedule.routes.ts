import express from 'express'
import { scheduleController } from './schedule.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
const router = express.Router();
router.get(
    '/',
    auth(UserRole.DOCTOR, UserRole.ADMIN),
    scheduleController.getAllFromDB
);
router.post('/',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    scheduleController.inserIntoDB)
router.delete(
    '/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    scheduleController.deleteFromDB
);
export const scheduleRoutes = router

