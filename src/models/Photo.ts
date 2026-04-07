// Barrel de compatibilidade — prefira importar dos arquivos específicos
export type { FeedItem as Photo, FeedResponse } from './Feed';
export type { Comment } from './Comment';
export type { Post } from './Post';

import type { Post } from './Post';
import type { Comment } from './Comment';

export interface PhotoData {
  post: Post;
  comments: Comment[];
}
