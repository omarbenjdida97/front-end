import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { TopTagsStateInterface } from 'src/app/shared/modules/topTags/types/topTagsState.interface';


export const topTagsFeatureSelector = createFeatureSelector<
  AppStateInterface,
  TopTagsStateInterface
>('topTags');

export const topTagsSelector = createSelector(
  topTagsFeatureSelector,
  (topTagsState: TopTagsStateInterface) => topTagsState.data,
);

export const isLoadingSelector = createSelector(
    topTagsFeatureSelector,
    (topTagsState: TopTagsStateInterface) => topTagsState.isLoading,
  );

  export const errorSelector = createSelector(
  topTagsFeatureSelector,
  (topTagsState: TopTagsStateInterface) => topTagsState.error,
);
