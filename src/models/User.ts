import { TUser } from '../types/TUser';
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        email: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
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
}, {
    timestamps: true
});

export default mongoose.model<TUser>("User", UserSchema);