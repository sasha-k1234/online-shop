import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../services/account.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);
  accountService.currentUser$.subscribe({
    next:user=>{
      if (user!==null) {
        req = req.clone({setHeaders:{
          "Authorization":'Bearer ' + user.accessToken
        }});
      }
    }
  })
  return next(req);
};


