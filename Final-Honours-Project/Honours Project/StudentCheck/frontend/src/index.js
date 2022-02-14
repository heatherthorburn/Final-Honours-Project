import 'react-app-polyfill/ie11'
import 'core-js/stable'

/* Above imports to allow for IE compatibility */

import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux'
import './header-style.css'
import './index.css';
import './drawer.css';
import './profile.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store'

ReactDOM.render(
  <Provider store = {store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
