import api from "./api";

export const postService = {
  getPosts: (params) => api.get("/posts", { params }),
  getPostBySlug: (slug) => api.get(`/posts/${slug}`),
  getPostById: (id) => api.get(`/posts/id/${id}`),
  getUserPosts: (userId, params) => api.get(`/posts/user/${userId}`, { params }),
  createPost: (data) => api.post("/posts", data),
  updatePost: (id, data) => api.put(`/posts/${id}`, data),
  deletePost: (id) => api.delete(`/posts/${id}`),
  publishDraft: (id) => api.put(`/posts/${id}/publish`),
  searchPosts: (params) => api.get("/posts/search", { params }),
};
