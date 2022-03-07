import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsComponent} from './products.component';
import {ProductNewComponent} from './product-new/product-new.component';
import {ProductsListComponent} from './products-list/products-list.component';
import {ProductInfoComponent} from './product-info/product-info.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {TitleResolver} from '@app/core/resolvers/title.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: '',
        component: ProductsListComponent,
        data: {title: 'Products list'},
        resolve: {title: TitleResolver}
      },
      {
        path: 'new',
        component: ProductNewComponent,
        data: {title: 'New product'},
        resolve: {title: TitleResolver}
      },
      {
        path: ':productId',
        component: ProductInfoComponent,
        data: {title: 'Product info'},
        resolve: {title: TitleResolver}
      },
      {
        path: ':productId/edit',
        component: ProductEditComponent,
        data: {title: 'Edit product'},
        resolve: {title: TitleResolver}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }