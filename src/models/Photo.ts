export interface Photo {
  id: number;
  title: string;
  src: string;
  acessos: string;
  author: string;
  peso: string;
  idade: string;
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
