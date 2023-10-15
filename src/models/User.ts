import { TUser } from './../types/Types';
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: { 
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: String,
    role: {
        type: String,
        enum: ["user", "staff", "admin"],
        default: "user"
    }
}, {
    timestamps: true
});

export default mongoose.model<TUser>("User", UserSchema);