import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
    school: String,
    degree: String,
    fieldOfStudy: String,
}, { _id: false });

const workSchema = new mongoose.Schema({
    company: String,
    position: String,
    years: String,
}, { _id: false });

const ProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    bio: { type: String, default: '' },
    currentPost: { type: String, default: '' },
    pastWork: { type: [workSchema], default: [] },
    education: { type: [educationSchema], default: [] }
}, { timestamps: true });

ProfileSchema.index({ userId: 1 });

const Profile = mongoose.model("Profile", ProfileSchema);
export default Profile;
