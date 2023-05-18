import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { CreateAdService } from 'src/app/createAd/services/createAd.service';
import {
  createAdAction,
  createAdFailureAction,
  createAdSuccessAction,
} from 'src/app/createAd/store/actions/createAd.action';
import { AdInterface } from 'src/app/shared/types/ad.interface';

@Injectable()
export class CreateAdEffect {
  createAd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createAdAction),
      switchMap(({ adInput }) => {
        return this.createAdService.createAd(adInput).pipe(
          map((ad: AdInterface) => {
            return createAdSuccessAction({ ad })
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              createAdFailureAction({ errors: errorResponse.error.errors }),
            );
          }),
        );
      }),
    ),
  );

  redirectAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createAdSuccessAction),
        tap(({ ad }) => {
          this.router.navigate(['/ads', ad.slug]);
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private createAdService: CreateAdService,
    private router: Router,
  ) {}
}
