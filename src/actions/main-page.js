import { get } from "../api"
export const FETCH_HOTELS = 'MAIN_PAGE/FETCH_HOTELS';
export const FETCH_HOTELS_SUCCESS = 'MAIN_PAGE/FETCH_HOTELS_SUCCESS';
export const FETCH_HOTELS_FAILURE = 'MAIN_PAGE/FETCH_HOTELS_FAILURE';

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

export default {
  fetchHotels
}