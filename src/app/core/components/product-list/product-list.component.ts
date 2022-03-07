import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '@app/core/models/';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {

  @Input() products: Product[];
  @Output() edit = new EventEmitter<Product>();
  @Output() show = new EventEmitter<Product>();
  @Output() remove = new EventEmitter<Product>();

  productsTrackByFn = (index: number, product: Product) => product.id;

  constructor() {}

  ngOnInit() {}


  showProduct(product: Product) {
    this.show.emit(product);
  }

  editProduct(product: Product) {
    this.edit.emit(product);
  }

  deleteProduct(product: Product) {
    this.remove.emit(product);
  }

}