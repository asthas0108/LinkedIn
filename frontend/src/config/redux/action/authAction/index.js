import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "../../../../config/index.jsx";

// Helper: attach token in headers
const authHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const loginUser = createAsyncThunk(
  "user/login",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.post("/login", {
        email: user.email,
        password: user.password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        return thunkAPI.fulfillWithValue(response.data.token);
      }

      return thunkAPI.rejectWithValue({ message: "token not provided" });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: "Login failed" });
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.post("/register", {
        username: user.username,
        password: user.password,
        email: user.email,
        name: user.name,
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: "Registration failed" });
    }
  }
);

export const getAboutUser = createAsyncThunk(
  "user/getAboutUser",
  async ({ token }, thunkAPI) => {
    try {
      const response = await clientServer.get("/get_user_and_profile", authHeaders(token));
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: "Failed to fetch user" });
    }
  }
);

export const getUserPosts = createAsyncThunk(
  "user/getUserPosts",
  async ({ userId, page = 1, limit = 10 }, thunkAPI) => {
    try {
      const response = await clientServer.get(`/user/${userId}/posts`, {
        params: { page, limit },
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: "Failed to fetch user posts" });
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await clientServer.get("/user/get_all_users");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: "Failed to fetch users" });
    }
  }
);

export const sendConnectionRequest = createAsyncThunk(
  "user/sendConnectionRequest",
  async ({ token, user_id }, thunkAPI) => {
    try {
      const response = await clientServer.post(
        "/user/send_connection_request",
        { connectionId: user_id },
        authHeaders(token)
      );

      thunkAPI.dispatch(getConnectionRequest({ token }));
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: "Failed to send request" });
    }
  }
);

export const getConnectionRequest = createAsyncThunk(
  "user/getConnectionRequest",
  async ({ token }, thunkAPI) => {
    try {
      const response = await clientServer.get("/user/getConnectionRequests", authHeaders(token));
      return thunkAPI.fulfillWithValue(response.data.connections);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: "Failed to fetch requests" });
    }
  }
);

export const getMyConnectionRequests = createAsyncThunk(
  "user/getMyConnectionRequests",
  async ({ token }, thunkAPI) => {
    try {
      const response = await clientServer.get("/user/user_connection_request", authHeaders(token));
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: "Failed to fetch my requests" });
    }
  }
);

export const AcceptConnection = createAsyncThunk(
  "user/acceptConnection",
  async ({ token, connectionId, action }, thunkAPI) => {
    try {
      const response = await clientServer.post(
        "/user/accept_connection_request",
        { requestId: connectionId, action_type: action },
        authHeaders(token)
      );

      thunkAPI.dispatch(getConnectionRequest({ token }));
      thunkAPI.dispatch(getMyConnectionRequests({ token }));

      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: "Failed to accept request" });
    }
  }
);
