import {Action, ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

import * as main from './reducers/main-reducer';
import {InjectionToken} from '@angular/core';

export interface State {
  main: main.MainState;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State, Action>>(
  'ROOT_REDUCERS_TOKEN',
  {
    factory: () => ({
      main: main.reducer
    })
  }
);

export const getMainState = createFeatureSelector<main.MainState>('main');

export const getCurrentTitle = createSelector(getMainState, main.getCurrentTitle);