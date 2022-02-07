import mongoose from "mongoose";

const schema = mongoose.Schema({
    "name": { type: String, required: true },
    "email": { type: String, required: true },
    "message": { type: String, required: true },
    "location": { type: String }

}, { timestamps: true })


export default mongoose.model("Query", schema)