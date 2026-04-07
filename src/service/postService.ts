import type { Post, PostUploadPayload, PostUpdatePayload, PostUploadResponse } from '@/models/Post';
import { apiService } from './apiService';

export const postService = {
  async getPost(postId: string | number): Promise<Post> {
    const data = await apiService.get<{ post: Post }>(`/posts/${postId}`);
    return data.post;
  },

  async uploadPost(payload: PostUploadPayload): Promise<PostUploadResponse> {
    const formData = new FormData();
    formData.append('photo', payload.photo);
    formData.append('title', payload.title);
    if (payload.weight !== undefined) formData.append('weight', String(payload.weight));
    if (payload.age !== undefined) formData.append('age', String(payload.age));
    if (payload.description) formData.append('description', payload.description);

    return apiService.post<PostUploadResponse>('/posts/upload', formData);
  },

  async updatePost(postId: string | number, payload: PostUpdatePayload): Promise<Post> {
    const data = await apiService.put<{ message: string; photo: Post }>(`/posts/${postId}`, payload);
    return data.photo;
  },

  async deletePost(postId: string | number): Promise<void> {
    await apiService.delete(`/posts/${postId}`);
  },

  async likePost(postId: string | number): Promise<number> {
    const data = await apiService.post<{ likes: number }>(`/posts/${postId}/like`);
    return data.likes;
  },

  async unlikePost(postId: string | number): Promise<number> {
    const data = await apiService.post<{ likes: number }>(`/posts/${postId}/unlike`);
    return data.likes;
  },
};
