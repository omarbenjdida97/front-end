import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CreateAdStateInterface } from 'src/app/createAd/types/createAdState.interface';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';

export const createAdFeatureSelector = createFeatureSelector<
  AppStateInterface,
  CreateAdStateInterface
>('createAd');

export const isSubmittingSelector = createSelector(
  createAdFeatureSelector,
  (createAdState: CreateAdStateInterface) => createAdState.isSubmitting,
);

export const validationErrorsSelector = createSelector(
  createAdFeatureSelector,
  (createAdState: CreateAdStateInterface) => createAdState.validationErrors,
);
