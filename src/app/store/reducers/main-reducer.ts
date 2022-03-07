import {createReducer, on} from '@ngrx/store';
import {setCurrentTitle} from '@app/root-store/actions/main-actions';
import {setState} from '@app/core/helpers/ngrx.helpers'

export interface MainState {
  currentTitle: string | undefined;
}

export const INIT_MAIN_STATE: MainState = {
  currentTitle: undefined
};

export const reducer = createReducer(
  INIT_MAIN_STATE,
  on(setCurrentTitle, (state, {payload: currentTitle}) =>
    setState({currentTitle}, state)
  )
);

export const getCurrentTitle = (state: MainState) => state ? state.currentTitle : null;