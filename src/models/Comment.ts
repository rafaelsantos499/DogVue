export interface CommentUser {
  uuid: string;
  name: string;
}

export interface Comment {
  uuid: string;
  body: string;
  created_at: string;
  user: CommentUser;
}

export interface CommentListResponse {
  data: Comment[];
  next_cursor: string | null;
}
