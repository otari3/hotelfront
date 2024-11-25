import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const setJwtTokenHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const auth_service = inject(AuthService);
  let modified_req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${auth_service.getting_item_localstorage(
        'token'
      )}`,
    },
  });

  console.log(req.url);
  return next(modified_req);
};
