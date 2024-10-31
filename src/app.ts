import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHendler';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser'
import cron from 'node-cron'
import { AppointmentService } from './app/modules/appointment/appointment.service';
const app: Application = express()
app.use(cors({
    origin: 'http://localhost:8080', // Allow only this origin
    credentials: true,               // Allow credentials to be included
  }));
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


cron.schedule('* * * * *', () => {
    try {
        AppointmentService.cancelUnpaidAppointments();
    }
    catch (err) {
        console.error(err);
    }
});
app.use('/api/v1', router);
app.get('/', (req: Request, res: Response) => {
    res.send({ message: 'health  care runnig' })
})
app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "API NOT FOUND!",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found!"
        }
    })
})
export default app
