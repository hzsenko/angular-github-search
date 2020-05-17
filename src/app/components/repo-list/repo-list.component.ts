import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs';
import {Store, select} from '@ngrx/store';
import {selectRepo, selectLoading} from 'src/app/reducers/repo/repo.selectors';
import {Router, ActivatedRoute} from '@angular/router';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent implements OnInit, OnDestroy {
  public repos$: Observable<any> = this.store.pipe(select(selectRepo));
  public repos: any[];
  public loading$: Observable<any> = this.store.pipe(select(selectLoading));
  public loading = false;

  @Input('filteredItems') set filteredItems(value) {
    if (value) {
      this.repos = value;
    }
  }

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    public router: Router) { }

  ngOnInit(): void {
    this.repos$
      .pipe(
        untilDestroyed(this)
      )
      .subscribe(items => this.repos = items);

    this.loading$
      .pipe(
        untilDestroyed(this)
      )
      .subscribe(loading => this.loading = loading);
  }

  ngOnDestroy(): void {
  }

  async openRepo(item: any) {
    await this.router.navigate(['repo', item.id], {
      replaceUrl: true,
      relativeTo: this.route
    });
  }
}
