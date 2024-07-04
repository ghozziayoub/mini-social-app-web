import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FromDb } from '../interfaces/FromDb';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/posts`;

  getPosts() {
    return this.http.get<FromDb<Post>[]>(`${this.apiUrl}/`);
  }

  getPostById(id: string) {
    return this.http.get<FromDb<Post>>(`${this.apiUrl}/${id}`);
  }

  createPost(content: string) {
    return this.http.post<any>(`${this.apiUrl}`, { content });
  }

  likePost(id: string, liked: boolean) {
    return this.http.post<FromDb<Post>>(`${this.apiUrl}/${id}/likes`, {
      liked,
    });
  }

  commentOnPost(id: string, content: string) {
    return this.http.post<FromDb<Post>>(`${this.apiUrl}/${id}/comments`, {
      content,
    });
  }

  deleteComment(id: string, commentId: string) {
    return this.http.delete<void>(`${this.apiUrl}/${id}/comments/${commentId}`);
  }

  deletePost(id: string) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
