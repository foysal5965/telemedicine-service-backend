import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { IAuthUser } from "../../interfaces/commont";
import { doctorScheduleService } from "./doctorSchedule.service";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../shared/pick";
import { scheduleFilterableFields } from "./doctorSchedule.constants";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {

    const user = req.user;
    const result = await doctorScheduleService.inserIntoDB(user, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Doctor Schedule created successfully!",
        data: result
    });
});

const getMySchedule = catchAsync(async (req: Request , res: Response) => {
    const filters = pick(req.query, ['startDate', 'endDate', 'isBooked']);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const user = req.user;
    const result = await doctorScheduleService.getMySchedule(filters, options, user as IAuthUser);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My Schedule fetched successfully!",
        data: result
    });
});

const deleteFromDB = catchAsync(async (req: Request , res: Response) => {

    const user = req.user;
    const { id } = req.params;
    const result = await doctorScheduleService.deleteFromDB(user as IAuthUser, id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My Schedule deleted successfully!",
        data: result
    });
});
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, scheduleFilterableFields);
    
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await doctorScheduleService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Doctor Schedule retrieval successfully',
        meta: result.meta,
        data: result.data,
    });
});
const getAvailableSchedules= catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, ['doctorId', 'startDate', 'endDate']);
    
    console.log(filters)
    const result = await doctorScheduleService.getAvailableSchedules(filters);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Doctor Schedule retrieval successfully',
        data: result
    });
});
export const   doctorScheduleController={
    insertIntoDB,
    getMySchedule,
    deleteFromDB,
    getAllFromDB,
    getAvailableSchedules
}