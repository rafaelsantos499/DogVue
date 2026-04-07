export interface FeedItem {
  uuid: string;
  feed_url: string | null;
  published_at: string;
  id: number;
}

export interface PersonalFeedItem extends FeedItem {
  weight: number;
  likes: number;
  liked: boolean;
}

export interface FeedMeta {
  per_page: number;
  next_cursor: string | null;
}

export interface FeedResponse {
  data: FeedItem[];
  meta: FeedMeta;
}

export interface PersonalFeedResponse {
  data: PersonalFeedItem[];
  meta: FeedMeta;
}

export interface FeedParams {
  per_page?: number;
  cursor?: string | null;
}
