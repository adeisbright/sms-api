import {Router} from "express"
import smsController from "./sms.controller"
import basicAuthentication from "../../middleware/basic-authentication"
import validateSMSInput from "../../middleware/validate-sms-input"

const smsRouter = Router() 

const {
    handleInboundSMS,
    handleOutboundSMS,
    handleMethodNotAllowed
} = smsController


smsRouter.post("/inbound/sms" , 
    basicAuthentication, 
    validateSMSInput,
    handleInboundSMS
)

smsRouter.post("/outbound/sms" , 
    basicAuthentication, 
    validateSMSInput,
    handleOutboundSMS
)

smsRouter.all("/inbound|outbound/sms" ,handleMethodNotAllowed)

export default smsRouter