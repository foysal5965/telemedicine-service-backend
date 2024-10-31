import { Request } from "express";

import { IFile } from "../../interfaces/file";
import { Prisma, Specialties } from "@prisma/client";
import { fileUploader } from "../../helpers/fileUploader";
import prisma from "../../shared/prisma";
import { ISpecialties } from "../doctor/doctor.interface";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../helpers/paginationHelper";
import { ISpecialtiesFilterRequest } from "./specialties.interface";
import ApiError from "../../error/ApiError";
import httpStatus from "http-status";

const inserIntoDB = async (req: Request) => {
    const isExist = await prisma.specialties.findFirst({
        where: {
            title: req.body.title
        }
    })
    if (isExist) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'This Specialty already exist!')
    }
    const file = req.file as IFile;

    if (file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
        req.body.icon = uploadToCloudinary?.secure_url;
    }

    const result = await prisma.specialties.create({
        data: req.body
    });

    return result;
};

const getAllFromDB = async (params: ISpecialtiesFilterRequest, options: IPaginationOptions) => {
    const { page, limit, skip } = paginationHelper.calculatePagination(options);
    const { searchTerm, ...filterData } = params;

    const andCondions: Prisma.SpecialtiesWhereInput[] = [];

    //console.log(filterData);
    if (params.searchTerm) {
        andCondions.push({
            OR: ['title'].map(field => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    };

    if (Object.keys(filterData).length > 0) {
        andCondions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key],
                    mode: 'insensitive'
                }
            }))
        })
    };


    //console.dir(andCondions, { depth: 'inifinity' })
    const whereConditons: Prisma.SpecialtiesWhereInput = { AND: andCondions }

    const result = await prisma.specialties.findMany({
        where: whereConditons,
        skip,
        take: limit,

    });

    const total = await prisma.specialties.count({
        where: whereConditons
    });

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
};

const deleteFromDB = async (id: string): Promise<Specialties> => {
    const result = await prisma.specialties.delete({
        where: {
            id,
        },
    });
    return result;
};

export const SpecialtiesService = {
    inserIntoDB,
    getAllFromDB,
    deleteFromDB
}