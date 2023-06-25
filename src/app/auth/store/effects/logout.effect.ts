import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { logoutAction } from 'src/app/auth/store/actions/sync.action';
import { PersistanceService } from 'src/app/shared/services/persistance.service';

@Injectable()
export class LogoutEffect {
  logout$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(logoutAction),
        tap(() => {
          this.persistanceService.set('accessToken', '');
          this.router.navigateByUrl('/');
        }),
      ),
    { dispatch: false },
  );
  constructor(
    private action$: Actions,
    private persistanceService: PersistanceService,
    private router: Router,
  ) {}
}
