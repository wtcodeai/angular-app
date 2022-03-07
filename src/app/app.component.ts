import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import * as fromRoot from '@app/root-store';
import {select, Store} from '@ngrx/store';

@Component({
  selector: 'app-root',
  template: `
    <div><app-header [title]="currentPageTitle$ | async" ></app-header></div>
    <div style="margin-top: 70px" class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  currentPageTitle$ = this.store.pipe(
    select(fromRoot.getCurrentTitle)
  );
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
  }
}