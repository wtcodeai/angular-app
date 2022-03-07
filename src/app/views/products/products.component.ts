import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-products',
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {}