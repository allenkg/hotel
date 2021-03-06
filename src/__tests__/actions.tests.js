import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { FETCH_HOTELS, FETCH_HOTELS_FAILURE, FETCH_HOTELS_SUCCESS, SET_FILTER } from "../actions/main-page";
import mainPageActions from "../actions/main-page";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Main Page Actions __tests__', function () {
  it('should return FETCH_HOTELS when dispatch fetchHotels', function () {
    const data = [
      {id: 1, name: 'First hotle' },
      {id: 2, name: 'Second Hotel' },
      {id: 3, name: 'Third Hotel' }
    ];
    fetch.mockResponse(JSON.stringify(data));
    const expectedActions = [
      { type: FETCH_HOTELS },
      { type: FETCH_HOTELS_SUCCESS, data }
    ];

    const store = mockStore({});
    return store.dispatch(mainPageActions.fetchHotels()).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    })
  });

  it('should return SET_FILTER when dispatch setFilter', function () {
    const filters = { star: 2 };
    const expectedActions = [
      { type: SET_FILTER, filters }
    ];

    const store = mockStore({});
    store.dispatch(mainPageActions.setFilter(filters));
    expect(store.getActions()).toEqual(expectedActions);
  });
});