import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map, pluck,
  startWith,
  switchMap
} from 'rxjs/operators';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ProductsService} from '../services/products.service';
import {
  create,
  createSuccess,
  failure,
  load,
  loadAll,
  loadAllSuccess,
  loadSuccess,
  remove,
  removeSuccess,
  update,
  updateSuccess
} from '@app/products-store/products-actions';

@Injectable()
export class ProductsEffects {

  loadAll$ = createEffect( () => this.actions$.pipe(
    ofType(loadAll),
    startWith(loadAll()),
    switchMap(() => this.productsService.list().pipe(
      map(products => {
        console.log('PRODUCTS IN EFFECT', products)
        return loadAllSuccess({products})
      })
    ))
  ));


  load$ = createEffect( () => this.actions$.pipe(
    ofType(load),
    pluck('id'),
    switchMap( id => this.productsService.show(id).pipe(
      map(product => {
        console.log('LOADSUCCESS', product)
        return loadSuccess({product})

      })
    ))
  ));

  create$ = createEffect( () =>this.actions$.pipe(
    ofType(create),
    pluck('product'),
    switchMap(product => {
      //const e = this.productsService.create(product)
      //console.log(e)
      return this.productsService.create(product).pipe(
        map(product => {
          return createSuccess({product})
        })
      )
    })
  ));


  update$ = createEffect( () => this.actions$.pipe(
    ofType(update),
    pluck('product'),
    exhaustMap( product => this.productsService.update(product).pipe(
      map(product => updateSuccess({product}))
    ))
  ));

  destroy$ = createEffect( () => this.actions$.pipe(
    ofType(remove),
    pluck('id'),
    switchMap( id => {
      const e = this.productsService.destroy(id)
      return e.pipe(
        map((id) => {
          console.log('onMapId', id)
          //@ts-ignore
          return removeSuccess({ id })
        })
      )

    })
  ));

  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}

}