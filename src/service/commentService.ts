import type { Comment, CommentListResponse } from '@/models/Comment';
import { apiService } from './apiService';

export const commentService = {
  async getComments(postUuid: string, cursor?: string | null): Promise<CommentListResponse> {
    return apiService.get<CommentListResponse>(`/posts/${postUuid}/comments`, {
      params: cursor ? { cursor } : undefined,
    });
  },

  async addComment(postUuid: string, body: string): Promise<Comment> {
    return apiService.post<Comment>(`/posts/${postUuid}/comments`, { body });
  },

  async updateComment(postUuid: string, commentUuid: string, body: string): Promise<void> {
    await apiService.put(`/posts/${postUuid}/comments/${commentUuid}`, { body });
  },

  async deleteComment(postUuid: string, commentUuid: string): Promise<void> {
    await apiService.delete(`/posts/${postUuid}/comments/${commentUuid}`);
  },
};
