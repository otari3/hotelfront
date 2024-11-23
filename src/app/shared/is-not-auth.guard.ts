import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const isNotAuthGuard: CanActivateFn = (route, state) => {
  const auth_service = inject(AuthService);
  const router = inject(Router);
  if (!auth_service.getting_item_localstorage('token')) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
