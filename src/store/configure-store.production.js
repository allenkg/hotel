import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import rootEpic from '../epics';
import { createEpicMiddleware } from 'redux-observable';


const router = routerMiddleware(browserHistory);
const epicMiddleware = createEpicMiddleware(rootEpic);

const enhancer = applyMiddleware(epicMiddleware, router);

function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}

export default configureStore;