import { Doctor, Prisma, UserStatus } from "@prisma/client";
import { IDoctorFilterRequest, IDoctorUpdate } from "./doctor.interface";
import { IPaginationOptions } from "../../interfaces/pagination";
import { doctorSearchableFields } from "./doctor.constant";
import prisma from "../../shared/prisma";
import { paginationHelper } from "../../helpers/paginationHelper";


const getAllFromDB = async (
    filters: IDoctorFilterRequest,
    options: IPaginationOptions,
) => {
    const { limit, page, skip } = paginationHelper.calculatePagination(options);
    const { searchTerm, specialties, ...filterData } = filters;

    const andConditions: Prisma.DoctorWhereInput[] = [];

    if (searchTerm) {
        andConditions.push({
            OR: doctorSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    };

    // doctor > doctorSpecialties > specialties -> title

    if (specialties && specialties.length > 0) {
        andConditions.push({
            DoctorSpecialties: {
                some: {
                    specialities: {
                        title: {
                            contains: specialties,
                            mode: 'insensitive'
                        }
                    }
                }
            }
        })
    };


    if (Object.keys(filterData).length > 0) {
        const filterConditions = Object.keys(filterData).map(key => ({
            [key]: {
                equals: (filterData as any)[key],
                mode: 'insensitive'
            },
        }));
        andConditions.push(...filterConditions);
    }

    andConditions.push({
        isDeleted: false,
    });

    const whereConditions: Prisma.DoctorWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.doctor.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : { createdAt: 'desc' },
        include: {
            DoctorSpecialties: {
                include: {
                    specialities: true
                }
            }
        },
    });

    const total = await prisma.doctor.count({
        where: whereConditions,
    });

    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
};

const getByIdFromDB = async (id: string): Promise<Doctor | null> => {
    console.log(id,'id data')
    const result = await prisma.doctor.findUnique({
        where: {
            id,
            isDeleted: false,
        },
        include: {
            DoctorSpecialties: {
                include: {
                    specialities: true
                }
            }
        }
    });
    return result;
};

const updateIntoDB = async (id: string, payload: IDoctorUpdate) => {
    const { specialties,email,  ...doctorData } = payload;
    // Separate `email` from `doctorData`

    // Find the current doctor information
    const doctorInfo = await prisma.doctor.findUniqueOrThrow({
        where: { id }
    });

    await prisma.$transaction(async (transactionClient) => {
        // Update the email in the `User` model
        await transactionClient.user.update({
            where: {
                email: doctorInfo.email
            },
            data: {
                email: payload.email// Update email separately in the `User` model
            }
        });

        // Update the Doctor data, excluding the email field
        await transactionClient.doctor.update({
            where: { id },
            data: {
                ...doctorData,
                email // Update email here, since it exists in the Doctor model
            } // Only `doctorData` is passed, without `email`
        });

        if (specialties && specialties.length > 0) {
            // Delete specialties
            const deleteSpecialtiesIds = specialties.filter(specialty => specialty.isDeleted);
            for (const specialty of deleteSpecialtiesIds) {
                await transactionClient.doctorSpecialties.deleteMany({
                    where: {
                        doctorId: doctorInfo.id,
                        specialitiesId: specialty.specialtiesId
                    }
                });
            }

            // Create specialties
            const createSpecialtiesIds = specialties.filter(specialty => !specialty.isDeleted);
            for (const specialty of createSpecialtiesIds) {
                await transactionClient.doctorSpecialties.create({
                    data: {
                        doctorId: doctorInfo.id,
                        specialitiesId: specialty.specialtiesId
                    }
                });
            }
        }
    });

    // Fetch the updated doctor info with specialties
    const result = await prisma.doctor.findUnique({
        where: { id: doctorInfo.id },
        include: {
            DoctorSpecialties: {
                include: { specialities: true }
            }
        }
    });
    return result;
};


const deleteFromDB = async (id: string): Promise<Doctor> => {
    return await prisma.$transaction(async transactionClient => {
        const deleteDoctor = await transactionClient.doctor.delete({
            where: {
                id,
            },
        });

        await transactionClient.user.delete({
            where: {
                email: deleteDoctor.email,
            },
        });

        return deleteDoctor;
    });
};

const softDelete = async (id: string): Promise<Doctor> => {
    return await prisma.$transaction(async transactionClient => {
        const deleteDoctor = await transactionClient.doctor.update({
            where: { id },
            data: {
                isDeleted: true,
            },
        });

        await transactionClient.user.update({
            where: {
                email: deleteDoctor.email,
            },
            data: {
                status: UserStatus.DELETED,
            },
        });

        return deleteDoctor;
    });
};



export const DoctorService = {
    updateIntoDB,
    getAllFromDB,
    getByIdFromDB,
    deleteFromDB,
    softDelete
}