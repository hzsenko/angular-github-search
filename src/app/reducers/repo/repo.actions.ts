import {Action} from '@ngrx/store';

export enum repoActionsType {
  set = '[REPO] set',
  setFiltered = '[REPO] setFiltered',
  setLoading = '[REPO] setLoading',
}

export class RepoSetAction implements Action {
  readonly type = repoActionsType.set;
  constructor(public payload: any){}
}

export class RepoSetFilteredAction implements Action {
  readonly type = repoActionsType.setFiltered;
  constructor(public payload: any){}
}

export class SetLoadingAction implements Action {
  readonly type = repoActionsType.setLoading;
  constructor(public payload: any){}
}

export type RepoActions  = RepoSetAction | RepoSetFilteredAction | SetLoadingAction;
