import mongoose from 'mongoose';
import { config } from 'dotenv';
config();
const db = `mongodb+srv://mrabhi748:abhi2193@exgrate.kjbzkoq.mongodb.net/?retryWrites=true&w=majority&appName=exgRate`
const connectDB = async () =>{
    try {
        const connectionInstance =  await mongoose.connect(db)
        console.log("DataBase connected")
    } catch (error) {
        console.log(`DataBase Error : ${error}`)
    }
}
export default connectDB