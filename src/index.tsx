import App from './App';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import store from './reducers/store';

const rootElement = document.getElementById('root');

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
