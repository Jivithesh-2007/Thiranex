import api from "./api";

export const userService = {
  getUserProfile: (userId) => api.get(`/users/${userId}`),
  getUserPosts: (userId, params) => api.get(`/users/${userId}/posts`, { params }),
  updateProfile: (data) => api.put("/users/profile", data),
  followUser: (userId) => api.post(`/users/${userId}/follow`),
  getUserComments: (params) => api.get("/users/my/comments", { params }),
};
