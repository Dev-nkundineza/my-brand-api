import mongoose from "mongoose";

const schema = mongoose.Schema({
    "title": { type: String, required: true },
    "content": { type: String, required: true },
    "image": { type: String, required: true },
    "author": { type: String, required: true },
    "status": { type: Boolean, required: true }
}, { timestamps: true })


export default mongoose.model("Article", schema)