import type { FeedResponse, PersonalFeedResponse, FeedParams } from '@/models/Feed';
import { apiService } from './apiService';

export const feedService = {
  async getFeed(params?: FeedParams): Promise<FeedResponse> {
    return apiService.get<FeedResponse>('/feed', { params });
  },

  async getPersonalFeed(params?: FeedParams): Promise<PersonalFeedResponse> {
    return apiService.get<PersonalFeedResponse>('/feed/personal', { params });
  },
};
