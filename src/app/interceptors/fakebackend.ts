import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpClient,
} from "@angular/common/http";
import { select, Store } from '@ngrx/store';
import * as fromProducts from '@app/products-store';
import { Observable, of } from "rxjs";
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { v4 as uuidv4 } from "uuid";

let loadProducts = () => JSON.parse(localStorage.getItem('products')!) || [];

@Injectable()
export class FakeBackendHttpInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromProducts.ProductsState>) { console.log('HTTP INTERCEPTOR INJECTED') }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('REQUEST HANDLED START', req)
    const a = this.handleRequests(req, next);
    console.log('REQUEST HANDLED END', req)
    return a
  }

  handleRequests(req: HttpRequest<any>, next: HttpHandler): any {
    const { url, method, headers, body }  = req;

    return of(null)
      //(https://github.com/Reactive-Extensions/RxJS/issues/648)
      //@ts-ignore
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(100))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/products') && method === 'GET':
          return getProducts();
        case url.match(/\/products\/\d+$/) && method === 'GET':
          return getProduct();
        case url.endsWith('/products') && method === 'POST':
          return createProduct();
        case url.match(/\/products\/\d+$/) && method === 'PATCH':
          return updateProduct();
        case url.match(/\/products\/\d+$/) && method === 'DELETE':
          return deleteProduct();
        default:
          return next.handle(req);
      }   
    }

    function getProducts() {
      console.log('PRODUCTS GETTER')
      return retOk(loadProducts())
    }

    function getProduct() {
      let products = loadProducts();
      const product = products.find((x: any) => x.id == getId());
      console.log('GET PRODUCT', product, products, getId())
      return retOk(product);
    }

    function createProduct() {
      let products = loadProducts()
      const params = body;
      const id = products.length ? Math.max(...products.map((x: any) => x.id)) + 1 : 1
      const product = { ...params, id }
      products = [ ...products, product]
      localStorage.setItem('products', JSON.stringify(products));
      console.log('NEW PRODUCT', product)
      return retOk(product)
    }

    function updateProduct() {
      let products = loadProducts()
      const params = body;
      const index = products.findIndex((x: any) => x.id == getId());
      const np = products.slice() // array copy to unfreeze
      const newProduct = { ...products[index], ...params }
      np[index] = newProduct
      localStorage.setItem('products', JSON.stringify(np));
      return retOk(newProduct);
    }

    function deleteProduct() {
      let products = loadProducts()
      const id = getId()
      products = products.filter((x: any) => x.id != id);
      console.log('ON DELETE LIST', products)
      localStorage.setItem('products', JSON.stringify(products));
      return retOk(id);
    }

    function getId() {
      const urlValues = url.split("/");
      return urlValues[urlValues.length - 1];
    }

    function retOk(body?: any): Observable<any> {
      return of(new HttpResponse({ status: 200, body }))
    }
  }

}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendHttpInterceptor,
  multi: true,
};