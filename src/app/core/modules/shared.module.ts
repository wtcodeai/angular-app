import { NgModule } from '@angular/core';
import {ProductListComponent} from '../components/product-list/product-list.component';
import {ProductFormComponent} from '../components/product-form/product-form.component';
import {ProductInfoComponent} from '../components/product-info/product-info.component';
import {HeaderComponent} from '../components/header/header.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FooterComponent} from '@app/core/components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    ProductListComponent,
    ProductInfoComponent,
    ProductFormComponent,
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    ProductListComponent,
    ProductInfoComponent,
    ProductFormComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }