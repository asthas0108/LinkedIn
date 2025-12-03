import { createSlice } from "@reduxjs/toolkit";
import {
  getAboutUser,
  getAllUsers,
  getConnectionRequest,
  getMyConnectionRequests,
  loginUser,
  registerUser,
  AcceptConnection,
} from "../../action/authAction";

// ✅ Initial State
const initialState = {
  user: null,
  connections: [],
  connectionRequest: [],
  all_users: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  loggedIn: false,
  profileFetched: false,
  all_profiles_fetched: false,
  isTokenThere: false,
  message: { message: "" },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState, // reset whole slice
    emptyMessage: (state) => {
      state.message = { message: "" };
    },
    setTokenIsThere: (state) => {
      state.isTokenThere = true;
    },
    setTokenIsNotThere: (state) => {
      state.isTokenThere = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.message = { message: "Knocking the door..." };
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.loggedIn = true;
        state.message = { message: "Login successful" };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || { message: "Login failed" };
      })

      // 🔹 Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.message = { message: "Registering you..." };
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = { message: "Registration successful, please log in" };
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || { message: "Registration failed" };
      })

      // 🔹 User profile
      .addCase(getAboutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.profileFetched = true;
        state.user = action.payload.profile;
      })

      // 🔹 All users
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.all_profiles_fetched = true;
        state.all_users = action.payload.profiles;
      })

      // 🔹 Connections
      .addCase(getConnectionRequest.fulfilled, (state, action) => {
        state.connections = action.payload;
      })
      .addCase(getConnectionRequest.rejected, (state, action) => {
        state.message = action.payload || { message: "Failed to fetch connections" };
      })

      // 🔹 My requests
      .addCase(getMyConnectionRequests.fulfilled, (state, action) => {
        state.connectionRequest = action.payload.connections;
      })
      .addCase(getMyConnectionRequests.rejected, (state, action) => {
        state.message = action.payload || { message: "Failed to fetch requests" };
      })

      // 🔹 Accept connection
      .addCase(AcceptConnection.fulfilled, (state, action) => {
        state.message = action.payload.message || "Connection updated";
      })
      .addCase(AcceptConnection.rejected, (state, action) => {
        state.message = action.payload || { message: "Failed to update connection" };
      });
  },
});

export const {
  reset,
  emptyMessage,
  setTokenIsNotThere,
  setTokenIsThere,
} = authSlice.actions;

export default authSlice.reducer;
