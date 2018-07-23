import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './styles/index.css';
import './styles/splitpane.css';

import Store from './store';
import App from './components/AppComponent.js';
import CompilerUtil from './utils/CompilerUtil';
import CompilationActions from './actions/CompilationActions';

ReactDOM.render(
  <Provider store={Store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

// Initialize solc-js via browser-solc.
require('browser-solc');
window.addEventListener('load', async () => {
  await CompilerUtil.getCompiler();
  Store.dispatch(CompilationActions.compileSource());
});
