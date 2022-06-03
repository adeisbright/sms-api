import {Router} from "express"
import smsController from "./sms.controller"
import basicAuthentication from "../../middleware/basic-authentication"
import validateSMSInput from "../../middleware/validate-sms-input"

const smsRouter = Router() 

const {
    handleInboundSMS,
    handleOutboundSMS
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

export default smsRouter