// API Client for interacting with the JSONPlaceholder API

import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// Retrieves a list of posts from the API
export const getPosts = () => {
  return api.get("/posts");
};

// Deletes a post by ID from the API
export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};

// Creates a new post on the API
export const createPost = (newPost) => {
  return api.post("/posts", newPost);
};

// Updates an existing post by ID on the API
export const updatePost = (id, post) => {
  return api.put(`/posts/${id}`, post);
};
