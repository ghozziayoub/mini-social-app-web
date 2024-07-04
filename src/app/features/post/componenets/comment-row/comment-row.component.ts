import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { FromDb } from '../../../../core/interfaces/FromDb';
import { Comment, Post } from '../../../../core/models/Post';
import { PostService } from '../../../../core/services/post.service';
import { UserService } from '../../../../core/services/user.service';
import { UserJWTPayload } from '../../../../core/models/User';

@Component({
  selector: 'app-comment-row',
  templateUrl: './comment-row.component.html',
  styleUrl: './comment-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentRowComponent {
  post = input.required<FromDb<Post>>();
  comment = input.required<FromDb<Comment>>();
  currentUser = input.required<UserJWTPayload>();
  onDelete = output<string>();
  private postService = inject(PostService);
  private userService = inject(UserService);

  isOwner(userId: string) {
    return this.userService.isOwner(userId);
  }

  deleteComment(commentId: string): void {
    this.postService.deleteComment(this.post()._id, commentId).subscribe({
      next: () => {
        this.onDelete.emit(commentId);
      },
    });
  }
}
