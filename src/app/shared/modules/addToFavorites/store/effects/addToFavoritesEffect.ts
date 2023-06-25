import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { AddToFavoritesService } from 'src/app/shared/modules/addToFavorites/services/addToFavorites.service';
import { addToFavoritesAction, addToFavoritesFailureAction, addToFavoritesSuccessAction } from 'src/app/shared/modules/addToFavorites/store/actions/addToFavorites.action';
import { AdInterface } from 'src/app/shared/types/ad.interface';


@Injectable()
export class AddToFavoritesEffect {
  addToFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToFavoritesAction),
      switchMap(({ isFavorited, slug }) => {
        const ad$ = isFavorited 
        ? this.addToFavoritesService.removeFromFavorites(slug) 
        : this.addToFavoritesService.addToFavorites(slug);
    return ad$.pipe(
        map((ad: AdInterface) => {
        return addToFavoritesSuccessAction({ ad });
      }),
         catchError(() => {
           return of(addToFavoritesFailureAction());
          }),
       );
      }),
    ),
  );

  constructor(private actions$: Actions, private addToFavoritesService: AddToFavoritesService) {}
}
