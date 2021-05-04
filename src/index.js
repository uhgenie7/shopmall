import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

let defAlert = true;

let defState = [
  { id: 0, name: "미토피아", quan: 2 },
  { id: 1, name: "New 포켓몬 스냅", quan: 4 },
  { id: 2, name: "슈퍼 마리오 3D 월드 + 퓨리 월드", quan: 10 },
  { id: 3, name: "링 피트 어드벤처", quan: 5 },
];
function reducer(state = defState, action) {
  if (action.type === "증가") {
    let copy = [...state];
    copy[0].quan++;
    return copy;
  } else if (action.type === "감소") {
    let copy = [...state];
    copy[0].quan--;
    return copy;
  } else {
    return state;
  }
}

let store = createStore(reducer);

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
