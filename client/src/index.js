import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './styles/index.scss'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; //dev
import Logger from 'redux-logger'; //dev
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import getUsers from './actions/users.actions';
import getPosts from './actions/post.actions';

const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk, Logger))
)

store.dispatch(getUsers());
store.dispatch(getPosts());

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </Provider>,
  document.getElementById("root")
)