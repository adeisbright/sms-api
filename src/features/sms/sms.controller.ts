import {Request , Response , NextFunction} from "express"
import ApplicationError from "../../common/error-handler/ApplicationError"
import NotFoundError from "../../common/error-handler/NotFoundError"
import tedis from "../../loaders/redis-loader"
import SMSRepository from "./SMS.repository"
import stopTextChecker from "./stop-text-checker"


class SMSController {
    async handleInboundSMS(
        req : Request , 
        res : Response , 
        next : NextFunction
    ){
       
        try{
            const account = res.locals.account 
            const {to , text , from} = req.body
            const query = {
                number : to, 
                account_id : account.id
            }

            const phoneNumber = await  SMSRepository.getPhoneNumber(query)
            if (phoneNumber == null){
                return next(new NotFoundError("to parameter not found"))
            }

            await stopTextChecker(text,from,to)

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