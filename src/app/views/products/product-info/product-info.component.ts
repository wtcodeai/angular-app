import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import { Product } from '@app/core/models';
import { ProductsStoreFacade } from '@app/products-store/products.store-facade';
import { ProductsEffects } from '@app/products-store/products-effects';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductInfoComponent implements OnInit, OnDestroy {

  product$ = this.activatedRoute.params.pipe(
    map( params => params['productId']),
    switchMap(id => this.productsFacade.getProductById(id))
  );
  redirectSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productsFacade: ProductsStoreFacade,
    private productsEffects: ProductsEffects
  ) {}

  ngOnInit(): void {
    this.redirectSub = this.productsEffects.destroy$.pipe(
      filter((action: any) => {
        console.log('FILTER', action, this.activatedRoute.snapshot.params['productId']);
        return action.id === this.activatedRoute.snapshot.params['productId']
      })
    ).subscribe((_: any) => {
      console.log('SUBSCRIPTION FULLFILLED')
      this.router.navigate(['/products'])
    });
    this.activatedRoute.params.subscribe(params => {
      this.productsFacade.loadProduct(+params['productId']);
    });

  }


  editProduct(product: Product) {
    this.router.navigate(['/products', product.id, 'edit']);
  }

  deleteProduct(product: Product) {
    if (!product.id) return
    const r = confirm('Are you sure?');
    if (r) {
      this.productsFacade.deleteProduct(product.id);
    }
  }

  ngOnDestroy() {
    this.redirectSub.unsubscribe();
  }

}