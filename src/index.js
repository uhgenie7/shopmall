import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

let defAlert = true;

function reducer2(state = defAlert, action) {
  if (action.type === "close") {
    let payload = action.payload;
    state = false;
    return state;
  } else {
    return state;
  }
}

let defState = [
  { id: 0, name: "미토피아", quan: 2 },
  { id: 1, name: "New 포켓몬 스냅", quan: 4 },
  { id: 2, name: "슈퍼 마리오 3D 월드 + 퓨리 월드", quan: 10 },
  { id: 3, name: "링 피트 어드벤처", quan: 5 },
];

function reducer(state = defState, action) {
  if (action.type === "항목추가") {
    let copy = [...state];
    copy.push(action.payload);
    return copy;
  } else if (action.type === "증가") {
    let copy = [...state];
    copy[action.payload].quan++;
    return copy;
  } else if (action.type === "감소") {
    let copy = [...state];
    if (copy[action.payload].quan > 0) {
      copy[action.payload].quan--;
    }
    return copy;
  } else {
    return state;
  }
}

let store = createStore(combineReducers({ reducer, reducer2 }));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
