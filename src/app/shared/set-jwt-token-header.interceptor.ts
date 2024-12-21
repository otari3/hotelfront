import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { SharedFunctionsService } from './shared-functions.service';
import { finalize } from 'rxjs';

export const setJwtTokenHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const auth_service = inject(AuthService);
  const sharedFunction = inject(SharedFunctionsService);
  sharedFunction.loading.next(true);
  let modified_req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${auth_service.getting_item_localstorage(
        'token'
      )}`,
    },
  });
  return next(modified_req).pipe(
    finalize(() => {
      sharedFunction.loading.next(false);
    })
  );
};
