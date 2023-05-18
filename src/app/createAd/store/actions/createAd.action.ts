import { createAction, props } from '@ngrx/store';
import { AdInterface } from 'src/app/shared/types/ad.interface';
import { AdInputInterface } from 'src/app/shared/types/adInput.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { ActionTypes } from 'src/app/createAd/store/actionTypes';

export const createAdAction = createAction(
  ActionTypes.CREATE_AD,
  props<{ adInput: AdInputInterface }>(),
);

export const createAdSuccessAction = createAction(
  ActionTypes.CREATE_AD_SUCCESS,
  props<{ ad: AdInterface }>(),
);

export const createAdFailureAction = createAction(
  ActionTypes.CREATE_AD_FAILURE,
  props<{ errors: BackendErrorsInterface }>(),
);
