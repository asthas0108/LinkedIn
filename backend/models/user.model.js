import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    active: { type: Boolean, default: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" },
    token: { type: String, default: '' }
}, { timestamps: true });

// Indexes
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ createdAt: -1 }); 
UserSchema.index({ name: "text", username: "text", email: "text" }); // search

const User = mongoose.model("User", UserSchema);
export default User;
