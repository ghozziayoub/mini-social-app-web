import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormUtilService {
  markFormControlsAsTouched(formGroup: FormGroup): void {
    for (const control of Object.values(formGroup.controls)) {
      control.markAsTouched({ onlySelf: true });
    }
  }
}
