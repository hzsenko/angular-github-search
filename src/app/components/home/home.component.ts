import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs';
import {Store, select} from '@ngrx/store';
import {selectFilteredRepo} from '../../reducers/repo/repo.selectors';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private store: Store) { }

  public filteredItems$: Observable<any> = this.store.pipe(select(selectFilteredRepo));
  filteredItems = [];

  ngOnInit(): void {
    this.filteredItems$
      .pipe(untilDestroyed(this))
      .subscribe(items => this.filteredItems = items);
  }

  ngOnDestroy(): void {
  }
}
