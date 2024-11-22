import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let auth_service = inject(AuthService);
  let hotel_token = auth_service.getting_item_localstorage('token');
  console.log(hotel_token);

  if (hotel_token) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
