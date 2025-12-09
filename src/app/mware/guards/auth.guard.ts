import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '../../config/store';

export function userAuth(): CanActivateFn {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (route, state) => {
    const store = inject(Store);
    const router = inject(Router);

    if (!store.authToken()) {
      router.navigate(['/login']);
      return false;
    }

    return true;
  };
}
