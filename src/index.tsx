import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './scss/variables.scss';
import './scss/style.scss';
import {Provider} from "react-redux";
import store from "./redux/store";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
