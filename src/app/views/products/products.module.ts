import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductsComponent} from './products.component';
import {ProductInfoComponent} from './product-info/product-info.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {ProductNewComponent} from './product-new/product-new.component';
import {ProductsListComponent} from './products-list/products-list.component';
import {SharedModule} from '@app/core/modules/shared.module';
import {ProductsRoutingModule} from './products-routing.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ProductsEffects} from './store/products-effects';
import {ProductsStoreFacade} from '@app/products-store/products.store-facade';
import {reducers} from '@app/products-store';
import {ProductsService} from './services/products.service';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule,
    StoreModule.forFeature('products', reducers),
    EffectsModule.forFeature([ProductsEffects])
  ],
  declarations: [
    ProductsComponent,
    ProductInfoComponent,
    ProductEditComponent,
    ProductNewComponent,
    ProductsListComponent
  ],
  providers: [ ProductsStoreFacade, ProductsService]
})
export class ProductsModule { }