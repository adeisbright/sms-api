import { Request, Response, NextFunction } from "express";
import ApplicationError from "../common/error-handler/ApplicationError";
import BadRequestError from "../common/error-handler/BadRequestError";
import ForbiddenError from "../common/error-handler/ForbiddenError";
import NotAuthorizeError from "../common/error-handler/NotAuthorizeError";
import ErrorAlert from "../common/monitoring/ErrorAlert";
import errorLogger from "../common/logging/error-logger";
import NotFoundError from "../common/error-handler/NotFoundError";

type ErrorType = ApplicationError | BadRequestError | NotAuthorizeError |
    ForbiddenError  | ForbiddenError | NotFoundError;
 
const errorHandler = (
    err: ErrorType,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errorAlert = new ErrorAlert(err.message, err.name);
    errorAlert.notify();
    
    const errorMessage = `${req.ip}:${req.method} ${req.url} ${err.statusCode}:${err.name} ${err.message} `;


    errorLogger.log({
        message: errorMessage,
        level: "error"
    });

    const { statusCode, message } = err;
    const resStatusCode = statusCode ? statusCode : 500;

    const body  = {
        message: "",
        err:  err.message
    };

    
    if (err instanceof ApplicationError) {
        body.message = "error : unknown failure"
        res.status(resStatusCode).json(body);
    } else {
        res.status(resStatusCode).json(body);
    }
};

export default errorHandler;