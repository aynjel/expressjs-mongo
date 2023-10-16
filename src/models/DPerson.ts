import { TDPerson } from '../types/Types';
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const DPersonSchema = new Schema({
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
    }
}, {
    timestamps: true
});

export default mongoose.model<TDPerson>("DPerson", DPersonSchema);