import { DictionariesState } from './dictionaries.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const getDictionariesState =
  createFeatureSelector<DictionariesState>('dictionaries');

export const getDictionaries = createSelector(
  getDictionariesState,
  (state) => state.entities
);

export const getLoading = createSelector(
  getDictionariesState,
  (state) => state.loading
);

export const getIsReady = createSelector(
  getDictionariesState,
  (state) => state.entities && !state.loading
);

export const getRoles = createSelector(
  getDictionaries,
  (state) => state?.roles
);

export const getQualifications = createSelector(
  getDictionaries,
  (state) => state?.qualifications
);

export const getSkills = createSelector(
  getDictionaries,
  (state) => state?.skills
);

export const getSpecialization = createSelector(
  getDictionaries,
  (state) => state?.specializations
);
