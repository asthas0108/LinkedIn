import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "../../../../config/index.jsx";

const authHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getAllPosts = createAsyncThunk(
  "post/getAllPosts",
  async (_, thunkAPI) => {
    try {
      const response = await clientServer.get("/posts");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: "Failed to fetch posts" });
    }
  }
);

export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ body, media, fileType }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await clientServer.post(
        "/post",
        { body, media, fileType },
        authHeaders(token)
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: "Failed to create post" });
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async ({ post_id }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await clientServer.delete("/delete_post", {
        ...authHeaders(token),
        data: { post_id },
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: "Failed to delete post" });
    }
  }
);

export const incrementPostLike = createAsyncThunk(
  "post/incrementLike",
  async ({ post_id }, thunkAPI) => {
    try {
      const response = await clientServer.post("/increment_post_like", { post_id });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: "Failed to like post" });
    }
  }
);

export const getAllComments = createAsyncThunk(
  "post/getAllComments",
  async ({ post_id }, thunkAPI) => {
    try {
      const response = await clientServer.get("/get_comments", {
        params: { post_id },
      });
      return thunkAPI.fulfillWithValue({
        comments: response.data.comments,
        post_id,
      });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: "Failed to fetch comments" });
    }
  }
);

export const postComment = createAsyncThunk(
  "post/postComment",
  async ({ post_id, body }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await clientServer.post(
        "/comment",
        { post_id, commentBody: body },
        authHeaders(token)
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: "Failed to post comment" });
    }
  }
);
