import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { AdStateInterface } from 'src/app/ad/types/adState.interface';

export const adFeatureSelector = createFeatureSelector<
  AppStateInterface,
  AdStateInterface
>('ad');

export const isLoadingSelector = createSelector(
  adFeatureSelector,
  (adState: AdStateInterface) => adState.isLoading,
);

export const errorSelector = createSelector(
  adFeatureSelector,
  (adState: AdStateInterface) => adState.error,
);

export const adSelector = createSelector(
  adFeatureSelector,
  (adState: AdStateInterface) => adState.data,
);
