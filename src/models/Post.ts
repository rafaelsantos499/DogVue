export interface Post {
  uuid: string;
  user_id: number;
  original_path: string;
  feed_path: string;
  thumb_path: string;
  original_url: string;
  feed_url: string;
  thumb_url: string;
  weight: number | null;
  age: number | null;
  title: string;
  description: string | null;
  is_published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface PostUploadPayload {
  photo: File;
  title: string;
  weight?: number;
  age?: number;
  description?: string;
}

export interface PostUpdatePayload {
  weight?: number;
  age?: number;
  title?: string;
  description?: string;
  is_published?: boolean;
}

export interface PostUploadResponse {
  message: string;
  post: {
    original_path: string;
    feed_path: string;
    thumb_path: string;
    original_url: string;
    feed_url: string;
    thumb_url: string;
    weight: number | null;
    age: number | null;
    title: string;
    description: string | null;
  };
}
