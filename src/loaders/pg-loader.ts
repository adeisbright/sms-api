import { Sequelize } from "sequelize";
import config from "../config";
import errorLogger from "../common/logging/error-logger";
import infoLogger from "../common/logging/info-logger"

export const sequelize = new Sequelize(
	config.postgres.database,
	config.postgres.username,
	config.postgres.password,
	{
		host: config.postgres.host,
		dialect: "postgres" , 
		logging : false
	}
);

const launchPG = async () => {
	try {
		await sequelize.authenticate();
        infoLogger.log({
            message : "Connected to Postgres DB" , 
            level:"error"
        })
	} catch (error : any) {
        errorLogger.log({
            message : error.message , 
            level:"error"
        })
		sequelize.close()
	} 
};

export default launchPG;
