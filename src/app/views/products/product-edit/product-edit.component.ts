import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '@app/core/models';
import { ActivatedRoute, Router } from '@angular/router';
import {filter, map, switchMap} from 'rxjs/operators';
import { ProductsStoreFacade } from '@app/products-store/products.store-facade';
import { ProductsEffects } from '@app/products-store/products-effects';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductEditComponent implements OnInit, OnDestroy {

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

    this.redirectSub = this.productsEffects.update$.pipe(
      filter( action => action.product.id === +this.activatedRoute.snapshot.params['productId'])
    ).subscribe(
      action => this.router.navigate(['/products', action.product.id])
    );

    this.activatedRoute.params.subscribe(params => {
      this.productsFacade.loadProduct(+params['productId']);
    });

  }

  ngOnDestroy() {
    this.redirectSub.unsubscribe();
  }

  submitted(product: Product) {
    this.productsFacade.updateProduct(product);
  }

}