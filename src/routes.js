import React from 'react';
import { Route } from 'react-router';
import App from './components/App';
import Image from './components/Image';
import Gallery from './components/Gallery';
import NotFound from './components/NotFound';

const subdomain = process.env.NODE_ENV === 'production' ? 'gallery/dist' : '';

export default (
  <Route component={App}>
    <Route path={`/${subdomain}/`} component={Gallery} />
    <Route path={`/${subdomain}/image/:id`} component={Image} />
    <Route component={NotFound} />
  </Route>
);
