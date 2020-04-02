import React, { Component } from "react";
import ReactDOM from 'react-dom';
//import Button from './Components/Button';
//import { createStore, applyMiddleware } from 'redux';
//import * as createHistory  from 'history'
//import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
//import Routes from 'components/Routes';
//import reducer from 'reducers/index.js';
//import thunk from 'redux-thunk';
import Button from 'components/Button';
import SideNav from 'components/SideNav';
import NavBar from 'components/NavBar';
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

//import { configureStore } from '@reduxjs/toolkit';
/*import rootReducer from 'reducers';*/

//import store from "./redux/store";
//import TodoApp from "./TodoApp";

function App() {

  //const store = createStore(reducer, applyMiddleware(thunk));
  //console.log(store.getState());

  /*store.dispatch({
    type: 'SET_VALVE',
    text: 'Read the docs'
  });*/

  //console.log(store.getState());

  {/*const history = createHistory.createBrowserHistory();*/}
  //const store = createStoreWithMiddleware();
    /*reducer,
    applyMiddleware(thunk)
  );*/

  return (
    <div className="container">
      {/*<Provider store={store}>*/}
        <NavBar />
        {/*<TodoApp />*/}
      {/*</Provider>*/}
    </div>
  );
}

const rootElement = document.getElementById("app-container");
ReactDOM.render(<App />, rootElement);


/*  <Provider store={store}>
    <Router history={history}>
      <Routes />*/

/*    </Router>
  </Provider>
  <Provider store={store}>
    <Router history={history}>
      <Routes />
    </Router>
  </Provider>*/

// const btnSend = document.querySelector('#app-container');
//
// btnSend.addEventListener('click', evt => {
//
//     const xhr = new XMLHttpRequest();
//
//     xhr.addEventListener('load', evt => {
//
//         if (xhr.status == 200) {
//             const result = JSON.parse(xhr.response);
//             const resultEle = document.querySelector('#result');
//             resultEle.value = result.sum;
//         }
//     });
//
//     xhr.addEventListener('error', evt => {
//         console.error(evt);
//     });
//
//     xhr.open('post', 'api/add', true);
//
//     const formEle = document.querySelector('#myform');
//     const formData = new FormData(formEle);
//
//     xhr.send(formData);
//
// });
