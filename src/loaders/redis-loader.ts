
import {Tedis} from "tedis"
import Config from "../config"
import errorLogger from "../common/logging/error-logger";
import infoLogger from "../common/logging/info-logger"


let tedis =  new Tedis({
    port: Config.redis.port ,
    host: Config.redis.host
});

if (process.env.NODE_ENV === "production"){
    tedis = new Tedis({
        password:Config.redis.password,
        port: Config.redis.port ,
        host: Config.redis.host
    });
}


tedis.on("connect", () => {
    infoLogger.log({
       message : `Connected to Redis`,
       level:"info"
   })
});

tedis.on("timeout", () => {
    errorLogger.log({
        message : `Timeout while trying to connect to Redis`,
        level:"error"
    })
});

tedis.on("error", err => {
    errorLogger.log({
        message : err.message,
        level:"error"
    })
    tedis.close()
});


export default tedis

