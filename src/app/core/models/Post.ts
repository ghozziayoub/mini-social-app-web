import { FromDb } from '../interfaces/FromDb';
import { User } from './User';

export interface Comment {
  user: FromDb<User>;
  content: string;
}

export interface Post {
  _id: string;
  user: FromDb<User>;
  content: string;
  likes: string[];
  comments: FromDb<Comment>[];
}
