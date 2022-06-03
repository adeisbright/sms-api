import {Request , Response , NextFunction} from "express"
import ApplicationError from "../../common/error-handler/ApplicationError"

class SMSController {
    async handleInboundSMS(
        req : Request , 
        res : Response , 
        next : NextFunction
    ){
       
        try{
            res.status(200).json({
                message:"inbound sms ok",
                error:""
            })
        }catch(error : any){
            return next(new ApplicationError(error.message))
        }
    } 
}

export default new SMSController()