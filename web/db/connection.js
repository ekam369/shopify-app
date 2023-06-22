import mongoose from "mongoose";
import 'dotenv/config'
mongoose.set('strictQuery', false)

const dbconnect = async () => {
    // console.log(process.env)
    try {
        await mongoose.connect(process.env.db)
        console.log("connection succesfully")
    } catch (error) {
        console.log("no connection")
    }
}

dbconnect();

