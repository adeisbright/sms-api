import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import Config from "./config";
import httpLogger from "./common/logging/http-logger";
import errorHandler from "./middleware/error-handler";
import smsRouter from "./features/sms/sms.route";

dotenv.config();
const app: express.Application = express();

app.use(express.json());
app.use(httpLogger);
app.use(cors());
app.use(compression());
app.use(helmet());

app.use(smsRouter);

//Top level error 404 handling
app.use(function (req, res, next) {
	res.status(404);
	res.json({ message: "", error: "Route not found" });
	next();
});

app.use(errorHandler);

app.listen(Config.serverPort, () => {
	console.log("Server started ");
});

export default app; //For testing purpose
