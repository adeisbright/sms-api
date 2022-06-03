import winston from "winston";
import path from "path";

const errorFile = path.join("./", "/logs/error.log");

const { combine, timestamp, prettyPrint } = winston.format;

const errorLogger = winston.createLogger({
	level: "info",
	format: combine(timestamp(), prettyPrint()),
	transports: [
		new winston.transports.File({ filename: errorFile, level: "error" })
	],
	exitOnError: false
});

export default errorLogger;
