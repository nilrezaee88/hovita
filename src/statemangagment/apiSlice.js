// apiSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import interceptorApi from "./interceptorApi";

// Define the async thunk for fetching the API data
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await interceptorApi.get("/users?page=1");
    return response.data.data;
  } catch (error) {
    throw new Error("Error fetching posts");
  }
});

// Define the async thunk for user login
export const userLogin = createAsyncThunk("login/userLogin", async (value) => {
  console.log({ value });
  try {
    const response = await interceptorApi.post("/login", value);
    console.log("response.data:", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Error login");
  }
});

// Define the async thunk for deleting a post
export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  try {
    await interceptorApi.delete(`/users/${id}`);
    console.log("Post deleted:", id);
    return id;
  } catch (error) {
    throw new Error("Error deleting post");
  }
});

// Create the slice
const apiSlice = createSlice({
  name: "api",
  initialState: {
    posts: [],
    accessToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = "succeeded";
        state.posts = action.payload;
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = "succeeded";
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});

// Export the reducer
export const apiReducer = apiSlice.reducer;
