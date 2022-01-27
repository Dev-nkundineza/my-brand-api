import mongoose from "mongoose";

const schema = mongoose.Schema({
    "name": { type: String, required: true },
    "comment": { type: String, required: true }
}, { timestamps: true })


export default mongoose.model("comment", schema)