import { Request, Response, NextFunction } from "express";
import ApplicationError from "../common/error-handler/ApplicationError";
import BadRequestError from "../common/error-handler/BadRequestError";
import ForbiddenError from "../common/error-handler/ForbiddenError";
import NotAuthorizeError from "../common/error-handler/NotAuthorizeError";
import ErrorAlert from "../common/monitoring/ErrorAlert";
import fileLogger from "../common/logging/file-logger";

type ErrorType =
    | ApplicationError
    | BadRequestError
    | NotAuthorizeError
    | ForbiddenError;

const errorHandler = (
    err: ErrorType,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errorAlert = new ErrorAlert(err.message, err.name);
    errorAlert.notify();
    
    const errorMessage = `${req.ip} : ${req.method} ${req.url} ${err.statusCode} :${err.name} ${err.message} `;


    fileLogger.log({
        message: errorMessage,
        level: "error"
    });

    const { statusCode, message } = err;
    const resStatusCode = statusCode ? statusCode : 500;

    const body  = {
        message: message,
        statusCode: resStatusCode,
        err:  err.message
    };

    
    if (err instanceof ApplicationError) {
        body.message = "ERROR 500 : INTERNAL SERVER ERROR";
        res.status(resStatusCode).json(body);
    } else {
        res.status(resStatusCode).json(body);
    }
};

export default errorHandler;