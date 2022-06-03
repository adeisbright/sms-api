import * as dotenv from "dotenv";
dotenv.config();

const environment : string = process.env.NODE_ENV === "production" ? "production" : 
    process.env.NODE_ENV === "development"  ? "development" : "test";


interface IRedis {
    port : number ;
    host : string ; 
    password ?: string;
}
    
interface IPostgres {
    host : string ;
    username : string ;
    password : string ;
    database : string ;
    dialect ?: string ;
    timezone ?: string;
}

interface IConfig {
    serverPort: string;
    redis : IRedis ;
    postgres : IPostgres
}

const Config : IConfig = {
    serverPort : process.env.SERVER_PORT as string ,
    redis : {
        host :  environment === "production" ?  
        (process.env.REMOTE_REDIS_HOST as string) :
        (process.env.LOCAL_REDIS_HOST as string ) ,

        port: environment === "production" ? 
            Number(process.env.REMOTE_REDIS_PORT) as number : 
            Number(process.env.LOCAL_REDIS_PORT) as number,

        password : process.env.REMOTE_REDIS_PASSWORD as string
    } ,
    postgres : {
        username: environment === "production" ?
            process.env.REMOTE_PG_USER as string : 
            process.env.LOCAL_PG_USER as string , 
           

        password: environment === "production" ? 
            process.env.REMOTE_PG_PASSWORD as string : 
            process.env.LOCAL_PG_PASSWORD as string,
           
        database: process.env.DB_NAME as string,
        host: environment === "production" ?
            process.env.REMOTE_PG_HOST as string : 
            process.env.LOCAL_PG_HOST as string
    }
}

export default Config