import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Product} from '@app/core/models';
import {environment} from '@app/env';


@Injectable()
export class ProductsService {

  constructor(private http: HttpClient ) { console.log('PRODUCTS SERVICE INJECTED') }


  list(): Observable<Product[]> {
    console.log('PRODUCTS LIST BEFORE REQUEST')
    const a = this.http
      .get<Product[]>(`${environment.appApi.baseUrl}/products`);
    console.log('Received products list observable', a)
    return a
  }

  show(productId: number): Observable<Product> {
    return this.http
        .get<Product>(`${environment.appApi.baseUrl}/products/${productId}`);
  }

  create(product: Product): Observable<Product> {
    const a = this.http.post<Product>(`${environment.appApi.baseUrl}/products`, product);
    console.log('WHAT DOES THE SERVICE RETURNS', a)
    return a
  }

  update(product: Partial<Product>): Observable<Product> {
    return this.http.patch<Product>(`${environment.appApi.baseUrl}/products/${product.id}`, product);
  }


  destroy(id: number): Observable<Product> {
    return this.http.delete<Product>(`${environment.appApi.baseUrl}/products/${id}`);
  }

}