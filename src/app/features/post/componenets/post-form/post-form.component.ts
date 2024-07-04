import { Component, DestroyRef, inject, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { FormUtilService } from '../../../../core/services/form-util.service';
import { PostService } from '../../../../core/services/post.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
})
export class PostFormComponent {
  onSubmit = output();
  isSubmitting = signal(false);
  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);
  private postService = inject(PostService);
  private userService = inject(UserService);
  private formUtilService = inject(FormUtilService);

  currentUser = this.userService.getCurrentUser();
  form = this.fb.group({
    content: this.fb.control('', [Validators.required]),
  });

  get Content() {
    return this.form.controls.content;
  }

  submit() {
    if (this.form.valid) {
      const { content } = this.form.value;
      const currentUser = this.currentUser;
      if (!content || !currentUser) return;

      this.isSubmitting.set(true);
      this.form.disable();
      this.postService
        .createPost(content)
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
