import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { Product } from '@app/core/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent implements OnInit, OnChanges {

  @Input() product: Product = {
    id: undefined,
    title: '',
    imageUrl: '',
    description: '',
    price: 0
  };

  @Output() save = new EventEmitter<Product>();

  productForm: FormGroup;

  constructor(public productFormBuilder: FormBuilder) {
    this.productForm = this.productFormBuilder.group({
      id: [this.product.id],
      title: [this.product.title, Validators.required],
      imageUrl: [this.product.imageUrl],
      price: [this.product.price, Validators.compose([Validators.required, Validators.pattern(/[0-9]+/)])],
      description: [this.product.description]
    });
  }

  ngOnInit(): void {

  }

  ngOnChanges() {
    if (this.product) {
      this.productForm.patchValue({...this.product});
    }
  }

  submit() {
    if (this.productForm.valid) {
      this.save.emit(this.productForm.value);
    }
    
  }

}