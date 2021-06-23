import mongoose from "mongoose";
const Schema = mongoose.Schema;

let PostSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: null
    },
    comments: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users"
        },
        content: {
            type: String,
            required: true
        },
        cmtLikes: [{
            userId: {
                type: Schema.Types.ObjectId,
                ref: "users"
            }
        }],
        createdAt: { type: Number, default: Date.now },
        updatedAt: { type: Number, default: null },
        deletedAt: { type: Number, default: null }
    }],
    postLikes: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users"
        }
    }],
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: null },
    deletedAt: { type: Number, default: null }
});

module.exports = mongoose.model("posts", PostSchema);