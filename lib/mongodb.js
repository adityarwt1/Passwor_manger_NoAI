import mongoose from 'mongoose'


 const connectDB = async () => {
    try {
       await mongoose.connect(process.env.MONGODB_URI,{
            dbName: "passwordManger"
        })
        
    }
    catch (error) {
        console.log("connection failed when trying to connect to mongo db")
    }
}

export default connectDB
