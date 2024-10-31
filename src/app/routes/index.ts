import express from 'express'
import { userRouter } from '../modules/user/user.routes'
import { AuthRoutes } from '../modules/auth/auth.routes';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { SpecialtiesRoutes } from '../modules/Specialities/speacialities.routes';
import { DoctorRoutes } from '../modules/doctor/doctor.routes';
import { PatientRoutes } from '../modules/patient/patient.routes';
import { scheduleRoutes } from '../modules/schedule/schedule.routes';
import { doctorScheduleRoutes } from '../modules/doctorSchedule/doctorSchedule.routes';
import { appointmentRouter } from '../modules/appointment/appointment.routes';
import { paymentRouter } from '../modules/payment/payment.routes';
import { presciptionRouter } from '../modules/prescription/prescription.routes';
import { ReviewRoutes } from '../modules/review/review.routes';
import { MetaRoutes } from '../modules/meta/meta.routes';
const router = express.Router()
const moduleRoutes = [
    // ... routes
    {
        path: "/user",
        route: userRouter
    },
    {
        path: "/admin",
        route: AdminRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    },

    {
        path: "/doctor",
        route: DoctorRoutes
    },
    {
        path: "/patients",
        route: PatientRoutes
    },
    {
        path: "/schedules",
        route: scheduleRoutes
    },
    {
        path: "/doctor-schedules",
        route: doctorScheduleRoutes
    },
    {
        path: "/appointment",
        route: appointmentRouter
    },
    {
        path: "/payment",
        route: paymentRouter
    },
    {
        path: "/prescription",
        route: presciptionRouter
    },
    {
        path: "/review",
        route: ReviewRoutes
    },
    {
        path: "/meta",
        route: MetaRoutes
    },
    {
        path: "/specialties",
        route: SpecialtiesRoutes
    },


]
moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;