import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AdInterface } from 'src/app/shared/types/ad.interface';
import { EditAdService } from '../../services/editAd.service';
import {
  updateAdAction,
  updateAdFailureAction,
  updateAdSuccessAction,
} from '../actions/updateAd.action';

@Injectable()
export class UpdateAdEffect {
  updateAd = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAdAction),
      switchMap(({ slug, adInput }) => {
        return this.editAdService.updateAd(slug, adInput).pipe(
          map((ad: AdInterface) => {
            return updateAdSuccessAction({ ad });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              updateAdFailureAction({ errors: errorResponse.error.errors }),
            );
          }),
        );
      }),
    ),
  );

  redirectAfterUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateAdSuccessAction),
        tap(({ ad }) => {
          this.router.navigate(['/ads', ad.slug]);
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private editAdService: EditAdService,
    private router: Router,
  ) {}
}
