import { createAction, props } from '@ngrx/store';
import { ActionTypes } from 'src/app/ad/store/actionTypes';

export const deleteAdAction = createAction(
  ActionTypes.DELETE_AD,
  props<{ slug: string }>(),
);

export const deleteAdSuccessAction = createAction(
  ActionTypes.DELETE_AD_SUCCESS
);

export const deleteAdFailureAction = createAction(ActionTypes.DELETE_AD_FAILURE);
