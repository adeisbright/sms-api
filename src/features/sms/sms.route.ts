import {Router} from "express"
import smsController from "./sms.controller"
import basicAuthentication from "../../middleware/basic-authentication"

const smsRouter = Router() 

const {
    handleInboundSMS,
} = smsController


smsRouter.post("/inbound/sms" , 
    basicAuthentication, 
    handleInboundSMS
)


export default smsRouter