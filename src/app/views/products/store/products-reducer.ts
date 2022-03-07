import { Product } from '@app/core/models';
import {EntityState, createEntityAdapter} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {
  createSuccess,
  loadAllSuccess,
  loadSuccess, removeSuccess,
  updateSuccess
} from '@app/products-store/products-actions';

export const productsAdapter = createEntityAdapter<Product>({
  //@ts-ignore
  selectId: (product: Product) => {
    console.log('ID SELECTOR', product);
    return product.id
  },
  sortComparer: false
});
export interface State extends EntityState<Product> {

}

export const INIT_STATE: State = productsAdapter.getInitialState({

});

export const reducer = createReducer<State>(
  INIT_STATE,
  on(loadAllSuccess, (state, {products}) => {
    console.log('LOAD ALL SUCCESS', state, products)
    return productsAdapter.setAll(products, state)
  }),
  on(loadSuccess, (state, {product}) => {
    console.log('loadSingleSuccess', product, state)
    return productsAdapter.upsertOne(product, state)
  }),
  on(createSuccess, (state, {product}) => {
    console.log('ADD', product, state)
    return productsAdapter.addOne(product, state)
  }),
  on(updateSuccess, (state, {product}) => {
    console.log('updateSuccess', product, state)
    console.log('ent', state.entities[product.id!])
    return productsAdapter.updateOne({id: product.id!, changes: product}, state)
  }),
  on(removeSuccess, (state, {id}) => {
    console.log('removeReducer', state, id)
    return productsAdapter.removeOne(id, state)
  })
);

export const getProductById = (id: number) => (state: State) => state.entities[id];