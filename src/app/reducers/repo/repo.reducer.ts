import {RepoActions, repoActionsType} from './repo.actions';

const initialState: any = {
  loading: false,
  filtered: [],
  items: [null],
};

export const repoReducer = (state = initialState, action: RepoActions) => {
  switch (action.type) {
    case repoActionsType.set:
      return {
        ...state,
        items: [...action.payload]
      };
    case repoActionsType.setFiltered:
      return {
        ...state,
        filtered: [...action.payload]
      };
    case repoActionsType.setLoading:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};
