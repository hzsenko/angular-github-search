import {Injectable} from '@angular/core';
import {fromEvent, EMPTY} from 'rxjs';
import {map, filter, debounceTime, distinctUntilChanged, switchMap, catchError, tap} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {Store} from '@ngrx/store';
import {SetLoadingAction} from 'src/app/reducers/repo/repo.actions';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  search(el: HTMLElement) {
    return fromEvent(el, 'input')
    .pipe(
      map((e: any) => e.target.value),
      filter(value => value.trim() !== ''),
      debounceTime(1000),
      tap(() => this.setLoading(true)),
      distinctUntilChanged(),
      switchMap(value => {
        const url = `https://api.github.com/search/repositories?q=${value}`;
        return ajax.getJSON(url)
            .pipe(
                catchError(() => EMPTY),
            );
    }));
  }

  setLoading(payload: boolean) {
    return this.store.dispatch(new SetLoadingAction(payload));
  }

  constructor(private store: Store) { }
}
