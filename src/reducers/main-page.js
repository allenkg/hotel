import merge from 'xtend';
import createReducer from './create-reducer';
import { FETCH_HOTELS, FETCH_HOTELS_SUCCESS, SET_FILTER } from "../actions/main-page";

const INITIAL_STATE = {
  hotels: [],
  isLoading: false,
  activeFilters: {}
};

export default createReducer({
  [FETCH_HOTELS]: (state, action) => merge(state, {
    isLoading: true
  }),
  [FETCH_HOTELS_SUCCESS]: (state, action) => merge(state, {
    isLoading: false,
    hotels: action.data
  }),
  [SET_FILTER]: (state, action) => merge(state, {
    activeFilters: action.filters
  })
}, INITIAL_STATE)