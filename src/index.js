import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import App from './components/App';
import changePage from './reducers';

let middleware = applyMiddleware();
if (process.env.DEVELOPMENT) {
  middleware = applyMiddleware(logger);
}
const store = createStore(changePage, middleware);

window.addEventListener('load', () => {
  ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));
});
