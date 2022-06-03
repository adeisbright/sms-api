import winston from "winston";
import path from "path";

const infoFile = path.join("./", "/logs/info.log");

const { combine, timestamp, prettyPrint } = winston.format;

const infoLogger = winston.createLogger({
	level: "info",
	format: combine(timestamp(), prettyPrint()),
	transports: [
		new winston.transports.File({ filename: infoFile, level: "info" })
	],
	exitOnError: false
});

export default infoLogger;
