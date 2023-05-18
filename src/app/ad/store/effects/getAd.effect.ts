import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { AdService as SharedAdService} from 'src/app/shared/services/ad.service';
import { AdInterface } from 'src/app/shared/types/ad.interface';
import { getAdAction, getAdFailureAction, getAdSuccessAction } from 'src/app/ad/store/actions/getAd.action';

@Injectable()
export class GetAdEffect {
  getAd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAdAction),
      switchMap(({ slug }) => {
        return this.sharedAdService.getAd(slug).pipe(
          map((ad: AdInterface) => {
            return getAdSuccessAction({ ad });
          }),
          catchError(() => {
            return of(getAdFailureAction());
          }),
        );
      }),
    ),
  );

  constructor(private actions$: Actions, private sharedAdService: SharedAdService) {}
}
