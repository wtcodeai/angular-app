import {createAction, props} from '@ngrx/store';
import { Product } from '@app/core/models';

export const loadAll = createAction(
  '[Products] Load all'
);

export const load = createAction(
  '[Products] Load',
  props<{id: number}>()
);

export const create = createAction(
  '[Products] Create',
  props<{product: Product}>()
);

export const update = createAction(
  '[Products] Update',
  props<{product: Partial<Product>}>()
);

export const remove = createAction(
  '[Products] Remove',
  props<{id: number}>()
);

export const loadAllSuccess = createAction(
  '[Products] Load all success',
  props<{products: Product[]}>()
);

export const loadSuccess = createAction(
  '[Products] Load success',
  props<{'product': Product}>()
);

export const createSuccess = createAction(
  '[Products] Create success',
  props<{product: Product}>()
);

export const updateSuccess = createAction(
  '[Products] Update success',
  props<{product: Partial<Product>}>()
);


export const removeSuccess = createAction(
  '[Products] Remove success',
  props<{id: number}>()
);


export const failure = createAction(
  '[Products] Failure',
  props<{err: {concern: 'CREATE' | 'PATCH', error: any}}>()
);