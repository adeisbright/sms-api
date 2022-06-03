import { NextFunction, Request, Response } from "express";
import ApplicationError from "../common/error-handler/ApplicationError";
import ForbiddenError from "../common/error-handler/ForbiddenError";
import NotAuthorizeError from "../common/error-handler/NotAuthorizeError";
import SMSRepository from "../features/sms/SMS.repository";

/**
 * @description
 * Authenticates a request to check if Basic Authorization
 * Header is set and if the provided data is stored in
 * the database
 * @param {Object} req HTTP Request object
 * @param {Object} res HTTP Response object
 * @param {Function} next
 * @returns  A callback{Function} to the next middleware
 */
const basicAuthentication = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { authorization } = req.headers;
		if (authorization === undefined || authorization === "") {
			res.set(
				"WWW-Authenticate",
				"Basic realm= Endpoints access, charset=UTF-8"
			);
			return next(new NotAuthorizeError("Authorization Header Missing"));
		}

		let basic = "";
		let encodedCredentials = "";

		if (authorization !== undefined) {
			[basic, encodedCredentials] = authorization.split(" ");
		}

		if (basic !== "Basic") {
			res.set(
				"WWW-Authenticate",
				"Basic realm= Access Token , charset=UTF-8"
			);
			return next(
				new NotAuthorizeError(
					"Invalid Authorization. Basic Authorization required"
				)
			);
		}

		const credentials = Buffer.from(encodedCredentials, "base64").toString(
			"ascii"
		);
		const [username, password] = credentials.split(":");
		const account = await SMSRepository.getAccount(username, password);

		if (account == null) {
			return next(new ForbiddenError("Forbidden"));
		}

		res.locals.account = account;
		next();
	} catch (error: any) {
		return next(new ApplicationError(error.message));
	}
};

export default basicAuthentication;
