import React from 'react';
import ReactDOM from 'react-dom';
import test from './test';

window.addEventListener('load', () => {
  ReactDOM.render(<div>{test()}</div>, document.getElementById('app'));
});
