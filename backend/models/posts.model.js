import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    body: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
    media: {
        type: String,
        default: '',
    },
    active: {
        type: Boolean,
        default: true,
    },
    fileType: {
        type: String,
        default: '',
    }
});

PostSchema.index({ userId: 1, createdAt: -1 });
PostSchema.index({ createdAt: -1 });

const Post = mongoose.model("Post", PostSchema);
export default Post;