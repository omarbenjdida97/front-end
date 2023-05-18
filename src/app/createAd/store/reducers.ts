import { Action, createReducer, on } from "@ngrx/store";
import { CreateAdStateInterface } from "src/app/createAd/types/createAdState.interface";
import { createAdAction, createAdSuccessAction, createAdFailureAction } from "src/app/createAd/store/actions/createAd.action";

const initialState: CreateAdStateInterface = {
    isSubmitting: false,
    validationErrors: null
};


const createAdReducer = createReducer(
    initialState,
    on(
        createAdAction,
        (state): CreateAdStateInterface => ({
            ...state,
            isSubmitting: true
        })
    ),
    on(
        createAdSuccessAction,
        (state): CreateAdStateInterface => ({
            ...state,
            isSubmitting: false
        })
    ),
    on(
        createAdFailureAction,
        (state, action): CreateAdStateInterface => ({
            ...state,
            isSubmitting: false,
            validationErrors: action.errors
        })
    )
);

export function reducers(state: CreateAdStateInterface, action: Action) {
    return createAdReducer(state, action);
}