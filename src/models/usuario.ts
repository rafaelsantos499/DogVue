export interface Usuario {
  uuid: string,
  name: string,
  email: string,
  google_id: string | null,
  email_verified_at: string | null,
  comment_timeout_until: string | null,
  created_at: string,
  updated_at: string,
}
