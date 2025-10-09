import User from "../models/user.model.js";
import Post from "../models/posts.model.js";
import Comment from "../models/comments.model.js";

/**
 * Health Check Endpoint
 */
export const activeCheck = async (req, res) => {
  return res.status(200).json({ message: "running" });
};

/**
 * Create a Post
 * - Finds user by token
 * - Creates a new post (with optional media/fileType)
 * - Saves author snapshot for faster feed queries
 */
// export const createPost = async (req, res) => {
//   const { token, body, media, fileType } = req.body;

//   try {
//     const user = await User.findOne({ token }).lean(); // faster plain object
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const post = new Post({
//       userId: user._id,
//       body,
//       media: media || "",
//       fileType: fileType || "",
//       authorName: user.name,              // ✅ denormalized field
//       authorPicture: user.profilePicture, // ✅ denormalized field
//     });

//     await post.save();

//     return res.status(201).json({
//       message: "Post created successfully!",
//       post,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       message: "Internal server error",
//       error: err.message,
//     });
//   }
// };


export const createPost = async (req, res) => {
  const { body, media, fileType } = req.body;

  try {
    // 1️⃣ Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];

    // 2️⃣ Find user by token
    const user = await User.findOne({ token }).lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3️⃣ Create post
    const post = new Post({
      userId: user._id,
      body,
      media: media || "",
      fileType: fileType || "",
      authorName: user.name,              
      authorPicture: user.profilePicture,
    });

    await post.save();

    return res.status(201).json({
      message: "Post created successfully!",
      post,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


/**
 * Get All Posts (Paginated Feed)
 * - Uses aggregation pipeline (faster than populate on scale)
 * - Returns author info + posts
 */
export const getAllPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const posts = await Post.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: Number(limit) },
      {
        $lookup: {
          from: "users", // collection name (lowercase plural)
          localField: "userId",
          foreignField: "_id",
          as: "author",
        },
      },
      { $unwind: "$author" },
      {
        $project: {
          body: 1,
          media: 1,
          fileType: 1,
          likes: 1,
          createdAt: 1,
          "author.name": 1,
          "author.username": 1,
          "author.email": 1,
          "author.profilePicture": 1,
        },
      },
    ]);

    const total = await Post.estimatedDocumentCount(); // faster than countDocuments

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

/**
 * Delete a Post
 * - Only the owner can delete
 * - Uses soft delete (active: false) instead of permanent deletion
 */
export const deletePost = async (req, res) => {
  const { token, post_id } = req.body;

  try {
    const user = await User.findOne({ token }).select("_id").lean();
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const post = await Post.findOne({ _id: post_id }).lean();
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }

    if (post.userId.toString() !== user._id.toString()) {
      return res.status(401).json({ message: "unauthorized" });
    }

    // ✅ Soft delete (better for logs & recovery)
    await Post.updateOne({ _id: post_id }, { active: false });

    return res.json({ message: "post deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * Comment on a Post
 * - Validates user & post
 * - Creates new comment
 */
export const commentPost = async (req, res) => {
  // 1️⃣ Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
  const { post_id, commentBody } = req.body;

  try {
    const user = await User.findOne({ token }).select("_id").lean();
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const post = await Post.findOne({ _id: post_id }).lean();
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }

    const comment = new Comment({
      userId: user._id,
      postId: post_id,
      body: commentBody,
    });

    await comment.save();
    return res.status(200).json({ message: "comment added" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * Get Comments for a Post (Paginated)
 * - Returns comments with user info
 */
export const get_comments_by_post = async (req, res) => {
  try {
    const { post_id, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const comments = await Comment.find({ postId: post_id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate("userId", "username name profilePicture")
      .lean();

    const total = await Comment.countDocuments({ postId: post_id });

    return res.json({
      comments,
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

/**
 * Delete Comment
 * - Only comment owner can delete
 */
export const delete_comment_of_user = async (req, res) => {
  const { token, comment_id } = req.body;

  try {
    const user = await User.findOne({ token }).select("_id").lean();
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const comment = await Comment.findOne({ _id: comment_id }).lean();
    if (!comment) {
      return res.status(404).json({ message: "comment not found" });
    }

    if (comment.userId.toString() !== user._id.toString()) {
      return res.status(401).json({ message: "unauthorized" });
    }

    await Comment.deleteOne({ _id: comment_id });

    return res.json({ message: "comment deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * Increment Likes on Post
 * - Uses $inc (atomic, concurrency safe)
 */
export const increment_likes = async (req, res) => {
  const { post_id } = req.body;

  try {
    const result = await Post.updateOne(
      { _id: post_id },
      { $inc: { likes: 1 } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "post not found" });
    }

    return res.json({ message: "likes incremented" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
