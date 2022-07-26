import { createSelector } from '@ngrx/store';
import { FormState } from './form.reducers';
import { getProfileState, ProfileState } from '../index';
import { STATE_PROVIDERS } from '@ngrx/store/src/state';

export const getFormState = createSelector(
  getProfileState,
  (state: ProfileState) => state.form
);

export const getPersonalForm = createSelector(
  getFormState,
  (state: FormState) => !!state.personal && state.personal
);

export const getProfessionalForm = createSelector(
  getFormState,
  (state: FormState) => !!state.professional && state.professional
);
