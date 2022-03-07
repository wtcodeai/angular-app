import { ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { Product } from '@app/core/models';
import { Router} from '@angular/router';
import { ProductsStoreFacade} from '@app/products-store/products.store-facade';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductNewComponent implements OnInit, OnDestroy {

  constructor(
    private productsFacade: ProductsStoreFacade,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  submitted(product: Product) {
    this.productsFacade.createProduct(product);
    console.log('AFTER NEW SUBMITTED AND ADDED, BEFORE REROUTED')
    this.router.navigate(['/products']);
  }

}