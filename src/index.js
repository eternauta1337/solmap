import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './styles/index.css';
import './styles/splitpane.css';
import 'bootstrap/dist/css/bootstrap.css';

import Store from './store';
import App from './components/AppComponent.js';

ReactDOM.render(
  <Provider store={Store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
