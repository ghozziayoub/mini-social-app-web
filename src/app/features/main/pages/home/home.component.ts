import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FromDb } from '../../../../core/interfaces/FromDb';
import { Post } from '../../../../core/models/Post';
import { PostService } from '../../../../core/services/post.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  posts: FromDb<Post>[] = [];
  isLoading = signal(false);
  private destroyRef = inject(DestroyRef);
  private postService = inject(PostService);
  private userService = inject(UserService);

  currentUser = this.userService.getCurrentUser();

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.isLoading.set(true);
    this.postService
      .getPosts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (posts) => {
          this.posts = posts;
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
  }

  logout() {
    this.userService.logout();
  }

  onDelete(postId: string) {
    this.posts = this.posts.filter((p) => p._id !== postId);
  }
}
