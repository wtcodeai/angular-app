import {createAction, props} from '@ngrx/store';

export const setCurrentTitle = createAction(
  'Set current title',
  props<{payload: string}>()
);