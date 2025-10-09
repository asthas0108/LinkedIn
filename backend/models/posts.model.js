import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    body: { type: String, required: true },
    likes: { type: Number, default: 0 },
    media: { type: String, default: '' },
    fileType: { type: String, default: '' },
    active: { type: Boolean, default: true },

    // ✅ denormalized fields for faster feed
    authorName: { type: String },
    authorPicture: { type: String }
}, { timestamps: true });

// Indexes
PostSchema.index({ userId: 1, createdAt: -1 });
PostSchema.index({ createdAt: -1 });
PostSchema.index({ body: "text" }); // text search on posts

const Post = mongoose.model("Post", PostSchema);
export default Post;
