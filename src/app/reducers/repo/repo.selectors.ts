import {createFeatureSelector, createSelector} from '@ngrx/store';

export const selectRepoFeature = createFeatureSelector<any>('repositories');

export const selectRepo = createSelector(
  selectRepoFeature,
  (state: any): any[] => state.items
);

export const selectFilteredRepo = createSelector(
  selectRepoFeature,
  (state: any): any[] => state.filtered
);

export const selectLoading = createSelector(
  selectRepoFeature,
  (state: any): any[] => state.loading
);

export const selectRepoById = (id: string) => createSelector(
  selectRepoFeature,
  (state: any): any => {
    if (state && state.items) {
      return state.items.find(item => item.id === +id);
    }
    return null;
  }
);
