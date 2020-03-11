import React, { Component } from "react";
import ReactDOM from 'react-dom';
//import Button from './Components/Button';
//import { createStore, applyMiddleware } from 'redux'
//import * as createHistory  from 'history'
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import Routes from 'components/Routes';
//import reducer from './reducers'
//import thunk from 'redux-thunk';
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

function App() {

  {/*const history = createHistory.createBrowserHistory();
  const store = createStoreWithMiddleware(
    reducer,
    applyMiddleware(thunk)
  );*/}

  return (
    <div className="container">
    //  <Provider store={store}>
    //    <Router history={history}>
    //      <Routes />
          <Button/>
    //    </Router>
    //  </Provider>
      {/*<Provider store={store}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>*/}
    </div>
  );
}

const rootElement = document.getElementById("app-container");
ReactDOM.render(<App />, rootElement);


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
