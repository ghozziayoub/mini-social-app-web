import {
  Component,
  DestroyRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FromDb } from '../../../../core/interfaces/FromDb';
import { Post } from '../../../../core/models/Post';
import { UserJWTPayload } from '../../../../core/models/User';
import { FormUtilService } from '../../../../core/services/form-util.service';
import { PostService } from '../../../../core/services/post.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss',
})
export class CommentFormComponent {
  post = input.required<FromDb<Post>>();
  currentUser = input.required<UserJWTPayload>();
  onSubmit = output();
  isSubmitting = signal(false);
  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);
  private formUtilService = inject(FormUtilService);

  form = this.fb.group({
    comment: this.fb.control('', [Validators.required]),
  });

  get Comment() {
    return this.form.controls.comment;
  }

  submit() {
    if (this.form.valid) {
      const { comment } = this.form.value;
      const postId = this.route.snapshot.paramMap.get('id');

      if (!comment || !postId) return;

      this.isSubmitting.set(true);
      this.form.disable();
      this.postService
        .commentOnPost(postId, comment)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.form.enable();
            this.form.reset();
            this.onSubmit.emit();
            this.isSubmitting.set(false);
          },
          error: () => {
            this.form.enable();
            this.isSubmitting.set(false);
          },
        });
    } else {
      this.formUtilService.markFormControlsAsTouched(this.form);
    }
  }

  getErrorMessage(controlName: string) {
    const control = this.form.get(controlName);

    if (control?.hasError('required')) {
      return 'Field required';
    }

    return 'Field invalid';
  }
}
