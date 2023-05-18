import { Action, createReducer, on } from '@ngrx/store';
import { TopTagsStateInterface } from 'src/app/shared/modules/topTags/types/topTagsState.interface';
import {
  getTopTagsAction,
  getTopTagsFailureAction,
  getTopTagsSuccessAction,
} from 'src/app/shared/modules/topTags/store/actions/getTopTags.action';

const intialState: TopTagsStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const topTagsReducer = createReducer(
  intialState,
  on(
    getTopTagsAction,
    (state): TopTagsStateInterface => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    getTopTagsSuccessAction,
    (state, action): TopTagsStateInterface => ({
      ...state,
      isLoading: false,
      data: action.topTags,
    }),
  ),
  on(
    getTopTagsFailureAction,
    (state): TopTagsStateInterface => ({
      ...state,
      isLoading: false,
    }),
  ),
);

export function reducers(state: TopTagsStateInterface, action: Action) {
    return topTagsReducer(state, action);
    }