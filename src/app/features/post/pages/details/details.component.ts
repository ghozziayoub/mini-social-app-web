import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FromDb } from '../../../../core/interfaces/FromDb';
import { Post } from '../../../../core/models/Post';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../../core/services/post.service';
import { UserService } from '../../../../core/services/user.service';
import { FormUtilService } from '../../../../core/services/form-util.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  post?: FromDb<Post>;
  isLoading = signal(false);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);
  private userService = inject(UserService);

  currentUser = this.userService.getCurrentUser();

  ngOnInit(): void {
    this.loadPost();
  }

  loadPost(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (!postId) return;

    this.isLoading.set(true);
    this.postService
      .getPostById(postId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (post) => {
          this.post = post;
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  onDelete(commentId: string) {
    if (!this.post) return;
    this.post.comments = this.post.comments.filter((c) => c._id !== commentId);
  }
}
