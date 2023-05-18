import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { EditAdStateInterface } from '../types/editAdState.interface';

export const editAdFeatureSelector = createFeatureSelector<
  AppStateInterface,
  EditAdStateInterface
>('editAd');

export const adSelector = createSelector(
  editAdFeatureSelector,
  (editAdState: EditAdStateInterface) => editAdState.ad,
);

export const isLoadingSelector = createSelector(
  editAdFeatureSelector,
  (editAdState: EditAdStateInterface) => editAdState.isLoading,
);

export const isSubmittingSelector = createSelector(
  editAdFeatureSelector,
  (editAdState: EditAdStateInterface) => editAdState.isSubmitting,
);
 
export const validationErrorsSelector = createSelector(
  editAdFeatureSelector,
  (editAdState: EditAdStateInterface) => editAdState.validationErrors,
);
