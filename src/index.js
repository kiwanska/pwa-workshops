import 'whatwg-fetch';
import './index.scss';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}

if ('serviceWorker' in navigator) {
  const registration = runtime.register()
}
