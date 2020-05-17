import {ActionReducerMap} from '@ngrx/store';
import {repoReducer} from './repo/repo.reducer';

export interface State {
  repositories: {
    items: any;
    filtered: any;
    loading: boolean;
  };
}

export const reducers: ActionReducerMap<State> = {
  repositories: repoReducer,
};
