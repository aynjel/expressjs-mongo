import { IUser } from "./../interfaces/IUser";
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
    password: String
}, {
    timestamps: true
});

export default mongoose.model<IUser>("User", UserSchema);