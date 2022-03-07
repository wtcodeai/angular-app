import { Injectable } from '@angular/core';
import * as fromRoot from '@app/root-store';
import * as fromProducts from '@app/products-store';
import { select, Store } from '@ngrx/store';

import { Product } from '@app/core/models';
import {create, load, remove, update} from '@app/products-store/products-actions';

@Injectable()
export class ProductsStoreFacade {

  products$ = this.store.pipe(
    select(fromProducts.getAllProducts)
  );

  constructor(private store: Store<fromRoot.State>) { console.log('STORE FACADE INJECTED') }

  loadProduct(id: number) {
    this.store.dispatch(load({id}));
  }

  createProduct(product: Product) {
    console.log('ON STORE FACADE CREATE TRIGGERED', product)
    this.store.dispatch(create({product}));
  }

  updateProduct(product: Product) {
    this.store.dispatch(update({product}));
  }

  deleteProduct(id: number) {
    this.store.dispatch(remove({id}));
  }

  getProductById(id: number) {
    return this.store.pipe(
      select(fromProducts.getProductById(id))
    )
  }
}