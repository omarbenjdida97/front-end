import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { TopTagsService } from 'src/app/shared/modules/topTags/services/topTags.service';
import {
  getTopTagsAction,
  getTopTagsFailureAction,
  getTopTagsSuccessAction,
} from 'src/app/shared/modules/topTags/store/actions/getTopTags.action';
import { PopularTagType } from 'src/app/shared/types/popularTag.type';

@Injectable()
export class GetTopTagsEffect {
  getTopTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTopTagsAction),
      switchMap(() => {
        return this.topTagsService.getTopTags().pipe(
          map((topTags: PopularTagType[]) => {
            return getTopTagsSuccessAction({ topTags });
          }),
          catchError(() => {
            return of(getTopTagsFailureAction());
          }),
        );
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private topTagsService: TopTagsService,
  ) {}
}
