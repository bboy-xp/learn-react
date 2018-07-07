import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import reducer from './reducers/form';

const store = createStore(reducer);

store.subscribe(() => console.log("State updated!", store.getState()));

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
