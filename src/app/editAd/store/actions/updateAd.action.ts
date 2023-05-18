import { createAction, props } from "@ngrx/store";
import { AdInterface } from "src/app/shared/types/ad.interface";
import { AdInputInterface } from "src/app/shared/types/adInput.interface";
import { BackendErrorsInterface } from "src/app/shared/types/backendErrors.interface";
import { ActionTypes } from "../actionTypes";

export const updateAdAction = createAction(
    ActionTypes.UPDATE_AD,
    props<{slug: string, adInput: AdInputInterface}>()
);

export const updateAdSuccessAction = createAction(
    ActionTypes.UPDATE_AD_SUCCESS,
    props<{ ad: AdInterface }>()
);

export const updateAdFailureAction = createAction(
    ActionTypes.UPDATE_AD_FAILURE,
    props<{ errors: BackendErrorsInterface }>()
);
