import React from 'react';
import { Route } from 'react-router';
import App from './components/App';
import Image from './components/Image';
import Gallery from './components/Gallery';

export default (
  <Route component={App}>
    <Route path="/" component={Gallery} />
    <Route path="/image/:id" component={Image} />
  </Route>
);
