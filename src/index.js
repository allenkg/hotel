
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {browserHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore  from './store';
import Root from './containers/Root';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  )
};

render(Root);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    render(Root)
  })
}