import dotenv from "dotenv"
import express , {Request , Response} from "express" 
import cors from "cors" 
import helmet from "helmet" 
import compression from "compression"
import Config from "./config"
import httpLogger from "./common/logging/http-logger";
import errorHandler from "./middleware/error-handler"
import smsRouter from "./features/sms/sms.route"

dotenv.config() 
const app : express.Application = express()

app.use(express.json()) 
app.use(httpLogger)
app.use(cors())
app.use(compression())
app.use(helmet())


app.get("/" , (req : Request , res : Response) => {
    res.status(200).json({
        message : "SMS API STARTED",
        error: ""
    })
})

app.use(smsRouter)

//Top level error 405 handling 
app.all("/*" , (req : Request , res : Response) => {
    res.set("Allow" , "GET ,DELETE")
    res.status(405).json({
        message : "Method not allow",
        error: ""
    })
})

//Top level error 404 handling 
app.use(function(req, res, next) {
    res.status(404);
    res.json({status:404,title:"Not Found",msg:"Route not found"});
    next();
});

app.use(errorHandler)

app.listen(Config.serverPort , () => {
    console.log("Server started ")
})