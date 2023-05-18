import { Action, createReducer, on } from '@ngrx/store';
import { CreateAdStateInterface } from 'src/app/createAd/types/createAdState.interface';
import { EditAdStateInterface } from '../types/editAdState.interface';
import {
  updateAdAction,
  updateAdSuccessAction,
  updateAdFailureAction,
} from './actions/updateAd.action';
import {
  getAdAction,
  getAdFailureAction,
  getAdSuccessAction,
} from './actions/getAd.action';

const initialState: EditAdStateInterface = {
  isLoading: false,
  ad: null,
  isSubmitting: false,
  validationErrors: null,
};

const editAdReducer = createReducer(
  initialState,
  on(
    updateAdAction,
    (state): EditAdStateInterface => ({
      ...state,
      isSubmitting: true,
    }),
  ),
  on(
    updateAdSuccessAction,
    (state): EditAdStateInterface => ({
      ...state,
      isSubmitting: false,
    }),
  ),
  on(
    updateAdFailureAction,
    (state, action): EditAdStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    }),
  ),

  on(
    getAdAction,
    (state): EditAdStateInterface => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    getAdSuccessAction,
    (state, action): EditAdStateInterface => ({
      ...state,
      isLoading: false,
      ad: action.ad,
    }),
  ),
  on(
    getAdFailureAction,
    (state): EditAdStateInterface => ({
      ...state,
      isLoading: false,
    }),
  ),
);

export function reducers(state: EditAdStateInterface, action: Action) {
  return editAdReducer(state, action);
}
