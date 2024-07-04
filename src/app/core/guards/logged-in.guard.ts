import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const loggedInGuard: CanActivateFn = (_route, _state) => {
  const router = inject(Router);
  const userService = inject(UserService);

  if (userService.isLoggedIn()) {
    return router.createUrlTree(['/home']);
  }

  return true;
};