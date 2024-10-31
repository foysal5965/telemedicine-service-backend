import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { MetaService } from "./meta.service";
import { IAuthUser } from "../../interfaces/commont";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";

const fetchDashboardMetaData = catchAsync(async (req: Request , res: Response) => {

    const user = req.user;
    const result = await MetaService.fetchDashboardMetaData(user as IAuthUser);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Meta data retrival successfully!",
        data: result
    })
});

export const MetaController = {
    fetchDashboardMetaData
}