import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import BadRequestError from "../common/error-handler/BadRequestError";

const validateSMSInput = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { from, to, text } = req.body;

		const parameterHash = {
			from: "from is missing",
			to: "to is missing",
			text: "text is missing"
		};

		for (const [key, value] of Object.entries(parameterHash)) {
			if (parameterHash.hasOwnProperty(key)) {
				if (req.body[key] == null) {
					return next(new BadRequestError(value));
				}
			}
		}

		const Schema = Joi.object({
			from: Joi.string()
				.pattern(new RegExp("^[0-9]{6,16}$"))
				.message("from is invald")
				.required(),
			to: Joi.string()
				.pattern(new RegExp("^[0-9]{6,16}$"))
				.message("to is invald")
				.required(),
			text: Joi.string()
				.min(1)
				.max(120)
				.message("text is invald")
				.required()
		});

		await Schema.validateAsync({
			from,
			to,
			text
		});

		next();
	} catch (error: any) {
		return next(new BadRequestError(error.message));
	}
};

export default validateSMSInput;
