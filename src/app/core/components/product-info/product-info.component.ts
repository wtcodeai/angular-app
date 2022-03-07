import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Product } from '@app/core/models';


@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductInfoComponent implements OnInit {

  @Input() product: Product;
  @Output() edit = new EventEmitter<Product>();
  @Output() remove = new EventEmitter<Product>();

  constructor() { }

  ngOnInit() {

  }

}