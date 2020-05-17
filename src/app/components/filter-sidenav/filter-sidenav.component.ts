import {Component, OnInit} from '@angular/core';
import {EnumsService} from 'src/app/services/enums/enums.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Store, select} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectRepo} from 'src/app/reducers/repo/repo.selectors';
import {RepoSetFilteredAction} from 'src/app/reducers/repo/repo.actions';

@Component({
  selector: 'app-filter-sidenav',
  templateUrl: './filter-sidenav.component.html',
  styleUrls: ['./filter-sidenav.component.scss']
})
export class FilterSidenavComponent implements OnInit {
  constructor(
    public enums: EnumsService,
    public store: Store,
    public fb: FormBuilder) {
  }

  public repos$: Observable<any> = this.store.pipe(select(selectRepo));
  public repos: [];

  form: FormGroup = this.fb.group({
    archived: false,
    type: ['all'],
  });

  repoTypes = Object.keys(this.enums.repoTypes);

  ngOnInit(): void {
    this.repos$.subscribe(items => this.repos = items);
  }

  filter() {
    const data = this.form.value;
    let filtered;

    switch (data.type) {
      case 'private':
        filtered = this.repos.filter((item: any) => data.archived === item.archived && item.private === true);
        break;
      case 'public':
        filtered = this.repos.filter((item: any) => data.archived === item.archived && item.private === false);
        break;
      default:
        filtered = this.repos.filter((item: any) => data.archived === item.archived);
        break;
    }

    this.setFilteredRepo(filtered);
  }

  setFilteredRepo(payload: any) {
    return this.store.dispatch(new RepoSetFilteredAction(payload));
  }
}
