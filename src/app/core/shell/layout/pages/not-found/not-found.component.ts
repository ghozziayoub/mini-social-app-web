import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  private router = inject(Router);

  goBack(): void {
    this.router.navigate(['/']);
  }
}
