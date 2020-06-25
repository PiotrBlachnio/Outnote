import { Request, Response } from "express";
import { GenericError } from "../assets/errors";
import logger from "../utils/logger";
import IError from "../types/errors";

export default async (err: IError, req: Request, res: Response): Promise<Response> => {
    if(err instanceof GenericError) {
        await logger.log({ type: 'info', message: err.message, place: err.place });

        return res.status(err.statusCode).json({
            error: {
                message: err.message,
                id: err.id
            }
        });
    };

    await logger.log({ type: 'error', message: err.message, place: err.place });
    
    return res.status(500).json({
        error: {
            message: 'Internal server error',
            id: 0
        }
    });
};