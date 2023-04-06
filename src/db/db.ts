import * as dotenv from 'dotenv'
import mongoose from "mongoose";
dotenv.config()

const mongoURI =
    process.env.MONGO_URI
//"mongodb://localhost:27017"

console.log(mongoURI)
if (!mongoURI){
    throw new Error("No URL")
}

export async function runDb(){
    try {
        await mongoose.connect(mongoURI!)
        console.log("DB OK")
    } catch (err){
        await mongoose.disconnect()
    }
}
