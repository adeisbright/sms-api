import * as dotenv from "dotenv";
dotenv.config();

const env: string =
    process.env.NODE_ENV === "production" ? "production" : 
    process.env.NODE_ENV === "development"  ? "development" : "test";


interface IConfig {
    serverPort: string;
}

const Config : IConfig = {
    serverPort : process.env.SERVER_PORT as string
}

export default Config