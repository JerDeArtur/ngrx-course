import { inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AuthState } from './reducers';
import { isLoggedIn } from './auth.selectors';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators'


export const authGuard = () => {
  const store = inject(Store<AuthState>);
  const router = inject(Router);

  return store.pipe(
    select(isLoggedIn),
    tap(isLoggedIn => {
      if(!isLoggedIn){
        router.navigate(['/']);
      }
    })
  );
}
