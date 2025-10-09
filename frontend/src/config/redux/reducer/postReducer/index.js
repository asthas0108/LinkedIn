import { createSlice } from "@reduxjs/toolkit";
import {
  getAllComments,
  getAllPosts,
  createPost,
  deletePost,
  incrementPostLike,
  postComment,
} from "../../action/postAction/index.js";

// ✅ Initial State
const initialState = {
  posts: [],
  comments: [],
  postId: "",
  isLoading: false,
  isError: false,
  postFetched: false,
  message: "",
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: () => initialState, // fully reset state
    resetPostId: (state) => {
      state.postId = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch all posts
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching all posts...";
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.postFetched = true;
        // reverse only if server doesn't already sort by createdAt
        state.posts = [...action.payload.posts].reverse();
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || "Failed to fetch posts";
      })

      // 🔹 Create a post
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload.post); // add new post at top
      })

      // 🔹 Delete a post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.meta.arg.post_id);
        state.message = action.payload.message;
      })

      // 🔹 Like a post
      .addCase(incrementPostLike.fulfilled, (state, action) => {
        const postIndex = state.posts.findIndex((p) => p._id === action.meta.arg.post_id);
        if (postIndex > -1) {
          state.posts[postIndex].likes += 1;
        }
        state.message = action.payload.message;
      })

      // 🔹 Fetch comments for a post
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.postId = action.payload.post_id;
        state.comments = action.payload.comments;
      })

      // 🔹 Add comment
      .addCase(postComment.fulfilled, (state, action) => {
        // optionally push new comment (backend may return full comment object)
        if (action.payload.comment) {
          state.comments.unshift(action.payload.comment);
        }
        state.message = action.payload.message;
      });
  },
});

export const { reset, resetPostId } = postSlice.actions;
export default postSlice.reducer;
