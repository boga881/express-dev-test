import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Components/Button';

function App() {

  {/*const history = createHistory.createBrowserHistory();
  const store = createStoreWithMiddleware(
    reducer,
    applyMiddleware(thunk)
  );*/}

  return (
    <div className="container">
      <Button/>
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
