import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AdService } from 'src/app/ad/services/ad.service';
import {
  deleteAdAction,
  deleteAdFailureAction,
  deleteAdSuccessAction,
} from 'src/app/ad/store/actions/deleteAd.action';
import { Router } from '@angular/router';

@Injectable()
export class DeleteAdEffect {
  deleteAd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteAdAction),
      switchMap(({ slug }) => {
        return this.adService.deleteAd(slug).pipe(
          map(() => {
            return deleteAdSuccessAction();
          }),
          catchError(() => {
            return of(deleteAdFailureAction());
          }),
        );
      }),
    ),
  );

  redirectAfterDelete$ = createEffect(
    () =>
        this.actions$.pipe(
            ofType(deleteAdSuccessAction),
            tap(() => {
               this.router.navigate(['/']);
            })
        ),
    { dispatch: false }
    );

  constructor(private actions$: Actions, private adService: AdService, private router: Router) {}
}
