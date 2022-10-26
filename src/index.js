import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReducerContainer from "./containers/ReducerContainer";
import ReduxContainer from "./containers/reduxContainer";
import RTKContainer from "./containers/RTKContainer";
// ini untuk redux lama
// import { legacy_createStore as createStore } from "redux";
// import { initialValue, rootReducer } from "./Reducer/counterRedux";
// const store = createStore(rootReducer, initialValue);
// import { Provider } from "react-redux";

// jika menggunakan RTK maka store yang diambil dari APP/store.js
import { Provider } from "react-redux";
import { store } from "./app/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route
              path="/reducerContainer"
              element={<ReducerContainer />}
            ></Route>
            <Route path="/reduxContainer" element={<ReduxContainer />}></Route>
            <Route path="/RTKContainer" element={<RTKContainer />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
