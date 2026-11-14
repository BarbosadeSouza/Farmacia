import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);

  const adminLogado =
    sessionStorage.getItem('adminLogado') === 'true';

  if (adminLogado) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
