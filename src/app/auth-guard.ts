import { CanActivateFn, Router } from '@angular/router';
import { Authentication } from './auth-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authServise = inject(Authentication);
  const router = inject(Router);
  if (authServise.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
