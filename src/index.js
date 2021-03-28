import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore } from "redux";
const initialState = {
  searchInput: "",
  search: false,
};
function reducer(state = initialState, action) {
  // console.log("reducer", state, action);

  switch (action.type) {
    case "UPDATESEARCHINPUT":
      return {
        searchInput: action.payload,
        search: state.search,
      };
    case "TOGGLESEARCH":
      return {
        searchInput: state.searchInput,
        search: !state.search,
      };
    default:
      return state;
  }
}
const store = createStore(reducer);

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <App />
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
