import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, flatMap} from 'rxjs/operators';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {Observable} from 'rxjs';
import {Store, select} from '@ngrx/store';
import {selectRepoById} from 'src/app/reducers/repo/repo.selectors';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.scss']
})
export class RepoComponent implements OnInit, OnDestroy {
  public repo$: Observable<any> = null;
  repo = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store) {

    this.route.paramMap
    .pipe(
      map(p => p.get('_id')),
      flatMap(id => this.store.pipe(select(selectRepoById(id)))),
      untilDestroyed(this)
    )
    .subscribe(repo => this.repo = repo);
  }

  async back() {
    await this.router.navigate([''], {
      replaceUrl: true
    });
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }
}
