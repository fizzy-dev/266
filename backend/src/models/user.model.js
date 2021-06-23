import mongoose from "mongoose";
const Schema = mongoose.Schema

let UserChema = new Schema({
    
        username: {
        type: String,
        required: true,
        unique: true
    },
    email: {type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        defaul: "male"
    },
    phone: {
        type: Number,
        default: null
    },
    avatar: {
        type: String,
        default: "avatar-default.jpg"
    },
    role: {
        type: String,
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: false
    },
    verifyToken: String,
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: null },
    deletedAt: { type: Number, default: null }
});

module.exports = mongoose.model("users", UserChema);