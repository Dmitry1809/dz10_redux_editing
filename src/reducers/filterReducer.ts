import { SET_SEARCH_TERM, CLEAR_SEARCH, type FilterAction } from '../actions';

const initialState = {
  searchTerm: '',
};

export const filterReducer = (state = initialState, action: FilterAction) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
      };
    case CLEAR_SEARCH:
      return initialState;
    default:
      return state;
  }
};
