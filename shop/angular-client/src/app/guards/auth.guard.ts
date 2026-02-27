import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account.service';
import { map } from 'rxjs';
import { Toast, ToastrService } from 'ngx-toastr';

export function authGuard(val: boolean) {
  const loginGuard: CanActivateFn = (route, state) => {
    const accountService = inject(AccountService);
    const toastr = inject(ToastrService);

    return accountService.currentUser$.pipe(
      map((user) => {
        if (user) {
          // toastr.error('Access Denied');
          
          if (val===false) {
            toastr.error('Access Denied');
          }
          return val;
        }
        if (!val===false) {
          toastr.error('Access Denied');
        }
        return !val;
      })
    );
  };
  return loginGuard;
}
