import { createAction, props } from '@ngrx/store';
import { ActionTypes } from 'src/app/shared/modules/addToFavorites/store/actionTypes';
import { AdInterface } from 'src/app/shared/types/ad.interface';

export const addToFavoritesAction = createAction(
  ActionTypes.ADD_TO_FAVORITES,
  props<{ isFavorited: boolean; slug: string }>(),
);

export const addToFavoritesSuccessAction = createAction(
  ActionTypes.ADD_TO_FAVORITES_SUCCESS,
  props<{ ad: AdInterface }>(),
);

export const addToFavoritesFailureAction = createAction(
  ActionTypes.ADD_TO_FAVORITES_FAILURE,
);
