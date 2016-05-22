import React from 'react';
import ReactDOM from 'react-dom';
const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <div>Hello React!</div>
  , document.querySelector('#app'));
