import { createSlice } from "@reduxjs/toolkit";
import { getAboutUser, getAllUsers, getConnectionRequest, getMyConnectionRequests, loginUser, registerUser } from "../../action/authAction";

const initialState = {
  user: undefined,
  isError: false,
  isSuccess: false,
  isLoading: false,
  loggedIn: false,
  message: { message: "" }, // Ensure message has the expected structure
  isTokenThere: false,
  profileFetched: false,
  connections: [],
  connectionRequest: [],
  all_users: [],
  all_profiles_fetched: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    handleLoginUser: (state) => {
      state.message = { message: "Hello" };
    },
    emptyMessage: (state) => {
      state.message = { message: "" };
    },
    setTokenIsThere: (state) => {
      state.isTokenThere = true;
    },
    setTokenIsNotThere: (state) => {
      state.isTokenThere = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.message = { message: "Knocking the door..." };
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.loggedIn = true;
        state.message = { message: "Login is successful" };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload || { message: "Login failed" };
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.message = { message: "Registering you..." };
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.loggedIn = true;
        state.message = { message: "Registration successful, please log in" };
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload || { message: "Registration failed" };
      })
      .addCase(getAboutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.profileFetched = true;
        state.user = action.payload.profile;
      })

      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.all_profiles_fetched = true;
        state.all_users = action.payload.profiles;
      })

      .addCase(getConnectionRequest.fulfilled, (state, action) => {
        state.connections = action.payload
      })

      .addCase(getConnectionRequest.rejected, (state, action) => {
        state.message = action.payload
      })

      .addCase(getMyConnectionRequests.fulfilled, (state, action) => {
        state.connectionRequest = action.payload
      })

      .addCase(getMyConnectionRequests.rejected, (state, action) => {
        state.message = action.payload
      })
  },
});

export const { reset, emptyMessage, setTokenIsNotThere, setTokenIsThere } = authSlice.actions;

export default authSlice.reducer;
