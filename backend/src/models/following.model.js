import mongoose from "mongoose";
const Schema = mongoose.Schema

let FollowingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    followingId: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: null },
    deletedAt: { type: Number, default: null }
});

FollowingSchema.statics = {
    createNew(item) {
        return this.create(item);
    }
};

module.exports = mongoose.model("followings", FollowingSchema);