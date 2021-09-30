import { ActionReducerMap } from '@ngrx/store';
import * as fromDictionary from './dictionaries';
import * as fromUser from './user';

export interface State {
  dictionaries?: fromDictionary.DictionariesState;
  user: fromUser.UserState;
}

export const reducers: ActionReducerMap<State> = {
  dictionaries: fromDictionary.reducer,
  user: fromUser.reducer,
};

export const effects = [
  fromDictionary.DictionariesEffects,
  fromUser.UserEffects,
];
