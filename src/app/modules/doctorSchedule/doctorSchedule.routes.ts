import express from 'express';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import validateRequest from '../../middlewares/validateRequest';
import { doctorScheduleController } from './doctorSchedule.controller';
import { DoctorScheduleValidation } from './doctorSchedule.validation';
const router = express.Router();
router.get(
    '/',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
    doctorScheduleController.getAllFromDB
);
router.get('/available-schedules',doctorScheduleController.getAvailableSchedules)
router.get(
    '/my-schedule',
    auth(UserRole.DOCTOR),
    doctorScheduleController.getMySchedule
)
router.post(
    '/',
    auth(UserRole.DOCTOR),
    validateRequest(DoctorScheduleValidation.create),
    doctorScheduleController.insertIntoDB
);

router.delete(
    '/:id',
    auth(UserRole.DOCTOR),
    doctorScheduleController.deleteFromDB
);
export const doctorScheduleRoutes = router