import { Action, createReducer, on } from '@ngrx/store';
import { AdStateInterface } from 'src/app/ad/types/adState.interface';

import {routerNavigationAction } from '@ngrx/router-store';
import { getAdAction, getAdFailureAction, getAdSuccessAction } from 'src/app/ad/store/actions/getAd.action';

const intialState: AdStateInterface = {
  data: null,
  isLoading: false,
  error: null,
};

const adReducer = createReducer(
  intialState,
  on(
    getAdAction,
    (state): AdStateInterface => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    getAdSuccessAction,
    (state, action): AdStateInterface => ({
      ...state,
      isLoading: false,
      data: action.ad,
    }),
  ),
  on(
    getAdFailureAction,
    (state): AdStateInterface => ({
      ...state,
      isLoading: false,
    }),
  ),
  on(routerNavigationAction, (): AdStateInterface => intialState),
);
export function reducers(state: AdStateInterface, action: Action) {
  return adReducer(state, action);
}
