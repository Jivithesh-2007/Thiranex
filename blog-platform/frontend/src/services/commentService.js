import api from "./api";

export const commentService = {
  getComments: (postId, params) => api.get(`/comments/${postId}/comments`, { params }),
  createComment: (postId, data) => api.post(`/comments/${postId}/comments`, data),
  updateComment: (commentId, data) => api.put(`/comments/${commentId}`, data),
  deleteComment: (commentId) => api.delete(`/comments/${commentId}`),
  likeComment: (commentId) => api.post(`/comments/${commentId}/like`),
  approveComment: (commentId) => api.put(`/comments/${commentId}/approve`),
};
