import merge from 'xtend';
import createReducer from './create-reducer';
import { FETCH_HOTELS, FETCH_HOTELS_SUCCESS } from "../actions/main-page";

const INITIAL_STATE = {
  hotels: [],
  isLoading: false,
  filterItems: []
};

export default createReducer({
  [FETCH_HOTELS]: (state, action) => merge({
    isLoading: true
  }),
  [FETCH_HOTELS_SUCCESS]: (state, action) => merge({
    isLoading: false,
    hotels: action.data
  })

}, INITIAL_STATE)