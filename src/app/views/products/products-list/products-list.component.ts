import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Product } from '@app/core/models';
import { Router } from '@angular/router';
import { ProductsStoreFacade } from '@app/products-store/products.store-facade';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsListComponent implements OnInit {

  products$ = this.productsFacade.products$;

  constructor(private productsFacade: ProductsStoreFacade, private router: Router) { }

  ngOnInit(): void {}

  editProduct(product: Product) {
    this.router.navigate(['/products', product.id, 'edit']);
  }

  showProduct(product: Product) {
    this.router.navigate(['/products', product.id]);
  }

  deleteProduct(product: Product) {
    if (!product.id) return
    const r = confirm('Are you sure?');
    if (r) {
      this.productsFacade.deleteProduct(product.id);
    }
  }

}