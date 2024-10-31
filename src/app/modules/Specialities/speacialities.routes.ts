import express, { NextFunction, Request, Response } from 'express';
import { fileUploader } from '../../helpers/fileUploader';
import { SpecialtiesValidtaion } from './speacialities.validation';
import { SpecialtiesController } from './speacialities.controller';
import { UserRole } from '@prisma/client';
import auth from '../../middlewares/auth';
const router = express.Router();
router.get(
    '/',
    SpecialtiesController.getAllFromDB
);
router.post(
    '/',
    auth(UserRole.ADMIN,UserRole.SUPER_ADMIN),
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = SpecialtiesValidtaion.create.parse(JSON.parse(req.body.data))
        return SpecialtiesController.inserIntoDB(req, res, next)
    }
);
router.delete(
    '/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    SpecialtiesController.deleteFromDB
);
export const SpecialtiesRoutes = router;