import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormUtilService } from '../../../../core/services/form-util.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private formUtilService = inject(FormUtilService);
  private userService = inject(UserService);

  isSubmitting = signal(false);

  form = this.fb.group({
    fullName: this.fb.control('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required]),
  });

  get FullName() {
    return this.form.controls.fullName;
  }

  get Email() {
    return this.form.controls.email;
  }

  get Password() {
    return this.form.controls.password;
  }

  submit() {
    if (this.form.valid) {
      const { email, password, fullName } = this.form.value;

      if (!email || !password || !fullName) return;

      this.isSubmitting.set(true);
      this.form.disable();
      this.userService
        .signup(fullName, email, password)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.router.navigate(['/auth', 'login']);
            this.form.enable();
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

    if (control?.hasError('email')) {
      return `E-mail address invalid.`;
    }

    if (control?.hasError('minlength')) {
      return `Please enter at least ${control.errors?.['minlength']?.requiredLength} characters.`;
    }

    return 'Field invalid';
  }
}
