import mongoose, { Document , Schema } from "mongoose";

interface ExpoUser extends Document{
    username: string
    password: string
}


const ExpoUserSchema : Schema<ExpoUser> = new Schema({
    username:{
        type: String,
        required: true
    },
    password: {
        type: String
    }
},{timestamps: true})

const ExpoUser = mongoose.models.ExpoUser || mongoose.model<ExpoUser>("ExpoUser", ExpoUserSchema)
export default ExpoUser;