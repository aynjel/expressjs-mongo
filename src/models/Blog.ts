import { IBlog } from "../interfaces/IBlog";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    title: String,
    body: String
}, {
    timestamps: true
});

export default mongoose.model<IBlog>("Blog", UserSchema);