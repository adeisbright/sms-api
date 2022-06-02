import dotenv from "dotenv"
import express , {Request , Response} from "express" 

dotenv.config() 
 
const app : express.Application = express()

app.get("/" , (req : Request , res : Response) => {
    res.status(200).json({
        message : "SMS API STARTED",
        error: ""
    })
})

app.listen(process.env.SERVER_PORT || 4000 , () => {
    console.log("Server started ")
})