import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import AppRoutes from './components/AppRoutes';
import changePage from './reducers';

const middleware = process.env.DEVELOPMENT ? applyMiddleware(logger) : undefined;
const store = createStore(changePage, middleware);
ReactDOM.render(<Provider store={store}><AppRoutes /></Provider>, document.getElementById('app'));
