export interface Photo {
  id: string | number;
  title?: string;
  src: string;
  acessos?: string;
  author?: string;
  peso?: string;
  idade?: string;
  published_at?: string;
}

export interface Comment {
  comment_ID: string;
  comment_author: string;
  comment_content: string;
}

export interface PhotoData {
  photo: Photo;
  comments: Comment[];
}

export interface FeedResponse {
  data: Array<{
    uuid: string;
    feed_url: string;
    published_at: string;
    id: string | null;
  }>;
  meta: {
    per_page: number;
    next_cursor: string | null;
  };
}
