import mongoose from "mongoose";

const ConnectionRequestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    connectionId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status_accepted: { type: Boolean, default: null }
}, { timestamps: true });

// Indexes
ConnectionRequestSchema.index({ userId: 1, connectionId: 1 }, { unique: true });
ConnectionRequestSchema.index({ connectionId: 1, status_accepted: 1 });

const ConnectionRequest = mongoose.model("ConnectionRequest", ConnectionRequestSchema);
export default ConnectionRequest;
