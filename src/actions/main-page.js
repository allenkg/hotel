import { get } from "../api"
export const FETCH_HOTELS = 'MAIN_PAGE/FETCH_HOTELS';
export const FETCH_HOTELS_SUCCESS = 'MAIN_PAGE/FETCH_HOTELS_SUCCESS';
export const FETCH_HOTELS_FAILURE = 'MAIN_PAGE/FETCH_HOTELS_FAILURE';
export const SET_FILTER = 'MAIN_PAGE/SET_FILTER';

const url = 'http://localhost:3001/hotels';

function fetchHotels() {
  return (dispatch) => {
    dispatch({ type: FETCH_HOTELS });

    return get(url)
      .then((data) => {
        dispatch({ type: FETCH_HOTELS_SUCCESS, data });
      })
      .catch((errors) => dispatch({ type: FETCH_HOTELS_FAILURE, errors }))
  }
}

function setFilter(filters) {
  return { type: SET_FILTER, filters }
}

export default {
  fetchHotels,
  setFilter
}