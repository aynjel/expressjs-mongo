import { TUser } from './../types/Types';
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
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
        unique: true
    },
<<<<<<< HEAD
    password: String,
    role: {
        type: String,
        enum: ["user", "staff", "admin"],
        default: "user"
=======
    username:{
        type: String,
        required: true,
        unique: true
    },
    mobileNumber:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
>>>>>>> ad32f13df04f2194f498b17a72c2a809cc669b59
    }
}, {
    timestamps: true
});

export default mongoose.model<TUser>("User", UserSchema);