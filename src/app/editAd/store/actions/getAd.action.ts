import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "src/app/editAd/store/actionTypes";
import { AdInterface } from "src/app/shared/types/ad.interface";

export const getAdAction = createAction(
    ActionTypes.GET_AD,
    props<{ slug: string }>()
);

export const getAdSuccessAction = createAction(
    ActionTypes.GET_AD_SUCCESS,
    props<{ ad: AdInterface }>()
);

export const getAdFailureAction = createAction(
    ActionTypes.GET_AD_FAILURE
);
