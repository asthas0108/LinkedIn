// controllers/user.controller.js
import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import Post from "../models/posts.model.js";
import ConnectionRequest from "../models/connections.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import PDFDocument from "pdfkit";
import fs from "fs";

const convertUserDataTOPDF = async (userData) => {
  const doc = new PDFDocument();

  // ✅ Use secure random filename for PDFs
  const outputPath = crypto.randomBytes(16).toString("hex") + ".pdf";
  const stream = fs.createWriteStream("uploads/" + outputPath);

  doc.pipe(stream);

  // ✅ Defensive check: profile picture may not exist
  if (userData.userId?.profilePicture) {
    doc.image(`uploads/${userData.userId.profilePicture}`, {
      align: "center",
      width: 100,
    });
  }

  // ✅ Write user details
  doc.fontSize(14).text(`Name: ${userData.userId?.name || ""}`);
  doc.fontSize(14).text(`Email: ${userData.userId?.email || ""}`);
  doc.fontSize(14).text(`Username: ${userData.userId?.username || ""}`);
  doc.fontSize(14).text(`Bio: ${userData.bio || ""}`);
  doc.fontSize(14).text(`Current Position: ${userData.currentPost || ""}`);

  // ✅ Past Work
  if (userData.pastWork?.length > 0) {
    doc.fontSize(14).text("Past Work:");
    userData.pastWork.forEach((work) => {
      doc.fontSize(12).text(`Company: ${work.company || ""}`);
      doc.fontSize(12).text(`Position: ${work.position || ""}`);
      doc.fontSize(12).text(`Years: ${work.years || ""}`);
    });
  }

  doc.end();
  return outputPath;
};

export const register = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    if (!name || !email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Ensure unique indexes at DB level too (already in schema)
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Secure password hashing
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
    });

    // ✅ Create blank profile
    await Profile.create({ userId: newUser._id });

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(404).json({ message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // ✅ Replace with JWT in production (more scalable than storing token in DB)
    const token = crypto.randomBytes(32).toString("hex");
    user.token = token;
    await user.save();

    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      Post.find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .populate("userId", "name username email profilePicture"),
      Post.countDocuments({ userId }),
    ]);

    return res.json({
      posts,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const uploadProfilePicture = async (req, res) => {
  try {
    const { token, profilePicture } = req.body;

    if (!token || !profilePicture) {
      return res
        .status(400)
        .json({ message: "token and profilePicture are required" });
    }

    const user = await User.findOne({ token });
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ Save cloudinary URL directly
    user.profilePicture = profilePicture.url;
    await user.save();

    return res.json({
      message: "Profile picture updated successfully",
      profilePicture: user.profilePicture,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { token, ...newUserData } = req.body;

    const user = await User.findOne({ token });
    if (!user) return res.status(404).json({ message: "User not found" });

    const { username, email } = newUserData;
    if (username || email) {
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser && String(existingUser._id) !== String(user._id)) {
        return res.status(400).json({ message: "Email/Username already taken" });
      }
    }

    Object.assign(user, newUserData);
    await user.save();

    return res.json({ message: "User updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getUserAndProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const user = await User.findOne({ token });
    if (!user) return res.status(404).json({ message: "User not found" });

    const userProfile = await Profile.findOne({ userId: user._id }).populate(
      "userId",
      "name email username profilePicture"
    );

    return res.json({ profile: userProfile });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateProfileData = async (req, res) => {
  try {
    const { token, ...newProfileData } = req.body;

    const user = await User.findOne({ token });
    if (!user) return res.status(404).json({ message: "User not found" });

    const profile = await Profile.findOne({ userId: user._id });
    Object.assign(profile, newProfileData);
    await profile.save();

    return res.json({ message: "Profile updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getAllUserProfile = async (req, res) => {
  try {
    const profiles = await Profile.find().populate(
      "userId",
      "name username email profilePicture"
    );
    return res.json({ profiles });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const downloadProfile = async (req, res) => {
  try {
    const user_id = req.query.id;

    const userProfile = await Profile.findOne({ userId: user_id }).populate(
      "userId",
      "name username email profilePicture"
    );

    if (!userProfile)
      return res.status(404).json({ message: "Profile not found" });

    const outputPath = await convertUserDataTOPDF(userProfile);
    return res.json({ message: outputPath });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
 
export const sendConnectionRequest = async (req, res) => {
  const { connectionId } = req.body;
  const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

  try {
    const user = await User.findOne({ token });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (String(user._id) === String(connectionId)) {
      return res.status(400).json({ message: "Cannot connect with yourself" });
    }

    const connectionUser = await User.findById(connectionId);
    if (!connectionUser)
      return res.status(404).json({ message: "Connection user not found" });

    const existingRequest = await ConnectionRequest.findOne({
      userId: user._id,
      connectionId: connectionUser._id,
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Request already sent" });
    }

    await ConnectionRequest.create({
      userId: user._id,
      connectionId: connectionUser._id,
    });

    return res.json({ message: "Request sent successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getMyConnectionsRequests = async (req, res) => {
  const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

  try {
    const user = await User.findOne({ token });
    if (!user) return res.status(404).json({ message: "User not found" });

    const connections = await ConnectionRequest.find({ userId: user._id })
      .populate("connectionId", "name username email profilePicture")
      .sort({ createdAt: -1 });

    return res.json({ connections });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const whatAreMyConnections = async (req, res) => {
  const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

  try {
    const user = await User.findOne({ token });
    if (!user) return res.status(404).json({ message: "User not found" });

    const connections = await ConnectionRequest.find({
      connectionId: user._id,
      status_accepted: null, // ✅ Only accepted connections
    })
      .populate("userId", "name username email profilePicture")
      .sort({ createdAt: -1 });

    return res.json({connections});
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const acceptConnectionRequest = async (req, res) => {
  const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
  const { requestId, action_type } = req.body;

  if (!requestId || !action_type) {
    return res.status(400).json({ message: "Request ID and action type are required" });
  }
  try {
    const user = await User.findOne({ token });
    if (!user) return res.status(404).json({ message: "User not found" });

    const connection = await ConnectionRequest.findById(requestId);
    if (!connection)
      return res.status(404).json({ message: "Connection request not found" });

    connection.status_accepted = action_type === "accept";
    await connection.save();

    return res.json({ message: "Request updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getUserProfileAndUserBasedOnUsername = async (req, res) => {
  const { username } = req.query;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const userProfile = await Profile.findOne({ userId: user._id }).populate(
      "userId",
      "name username email profilePicture"
    );

    return res.json({ profile: userProfile });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
