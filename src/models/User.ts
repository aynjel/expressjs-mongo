import { TUser } from './../types/Types';
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        email: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "staff", "admin"],
        default: "user"
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    mobileNumber:{
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

export default mongoose.model<TUser>("User", UserSchema);