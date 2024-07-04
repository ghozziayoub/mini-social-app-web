import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { FromDb } from '../../../../core/interfaces/FromDb';
import { Post } from '../../../../core/models/Post';
import { UserJWTPayload } from '../../../../core/models/User';
import { PostService } from '../../../../core/services/post.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrl: './post-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostContentComponent {
  post = input.required<FromDb<Post>>();
  onDelete = output<string>();
  currentUser = input.required<UserJWTPayload | null>();
  showViewComments = input(false);

  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private postService = inject(PostService);
  private userService = inject(UserService);

  onToggleLike() {
    const currentUser = this.currentUser();
    if (!currentUser) return;
    const liked = this.post().likes.includes(currentUser.id);

    !liked
      ? this.post().likes.push(currentUser.id)
      : (this.post().likes = this.post().likes.filter(
          (p) => p !== currentUser.id
        ));

    this.postService
      .likePost(this.post()._id, !liked)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  goToPost(postId: string): void {
    this.router.navigate(['/posts', postId]);
  }

  isOwner(userId: string) {
    return this.userService.isOwner(userId);
  }

  deletePost(postId: string) {
    this.postService.deletePost(postId).subscribe({
      next: () => {
        this.onDelete.emit(this.post()._id);
      },
    });
  }
}
