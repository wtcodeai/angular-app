import * as fromProducts from './products-reducer';
import {Action, combineReducers, createFeatureSelector, createSelector} from '@ngrx/store';

export interface ProductsState {
  products: fromProducts.State;
}

/** Provide reducers with AoT-compilation compliance */
export function reducers(state: ProductsState | undefined, action: Action) {
  return combineReducers({
    products: fromProducts.reducer
  })(state, action)
}


/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */

export const getProductsState = createFeatureSelector<ProductsState>('products');

export const getProductsEntitiesState = createSelector(
  getProductsState,
  state => state.products
);

export const {
  selectAll: getAllProducts,
} = fromProducts.productsAdapter.getSelectors(getProductsEntitiesState);

export const getProductById = (id: number) => createSelector(
  getProductsEntitiesState,
  fromProducts.getProductById(id)
);