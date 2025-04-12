import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    plateform:[],
    plateFormPassword: []
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;