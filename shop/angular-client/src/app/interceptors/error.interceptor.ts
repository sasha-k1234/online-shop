import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { AccountService } from '../services/account.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
   const accountService = inject(AccountService);
   const router = inject(Router);
   const toastr = inject(ToastrService);
  return next(req).pipe(
    catchError((error:HttpErrorResponse)=>{
      if (error) {
        switch(error.status){
          case 401: 
          accountService.logout();
          router.navigateByUrl('/sign-in');
          toastr.warning('Sign in please');
          break;
          case 403:
          toastr.warning('Forbidden');
          break;
          case 500:
          toastr.error('Oops unexpected error');
          break;
          case 400:
          toastr.warning(error.error);
          break;
        }
      } 
      throw error;
    })
  ) 
};
