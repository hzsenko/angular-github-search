import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {SearchService} from 'src/app/services/search/search.service';
import {Store} from '@ngrx/store';
import {RepoSetAction, SetLoadingAction} from 'src/app/reducers/repo/repo.actions';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('search', { static: true }) search: ElementRef;

  constructor(public searchService: SearchService, private store: Store<any>) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  ngAfterViewInit() {
    this.searchService.search(this.search.nativeElement)
      .pipe(
        map((response: any) => response.items),
        untilDestroyed(this)
      )
      .subscribe(items => {
        this.setRepo(items);
        this.setLoading(false);
      });
  }

  setRepo(payload: any) {
    return this.store.dispatch(new RepoSetAction(payload));
  }

  setLoading(payload: boolean) {
    return this.store.dispatch(new SetLoadingAction(payload));
  }
}
