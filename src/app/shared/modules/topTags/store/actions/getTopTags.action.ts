import { createAction, props } from '@ngrx/store';
import { PopularTagType } from 'src/app/shared/types/popularTag.type';
import { ActionTypes } from 'src/app/shared/modules/topTags/store/actionTypes';

export const getTopTagsAction = createAction(ActionTypes.GET_TOP_TAGS);
export const getTopTagsSuccessAction = createAction(
  ActionTypes.GET_TOP_TAGS_SUCCESS,
  props<{ topTags: PopularTagType[] }>(),
);
export const getTopTagsFailureAction = createAction(
  ActionTypes.GET_TOP_TAGS_FAILURE,
);
