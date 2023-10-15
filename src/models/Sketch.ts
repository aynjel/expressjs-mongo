import { TSketch } from '../types/Types';
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SketchSchema = new Schema({
    name: String,
    coordinates: Array
}, {
    timestamps: true
});

export default mongoose.model<TSketch>("Sketch", SketchSchema);