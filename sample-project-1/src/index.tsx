import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/style.scss";
import store from "./store/configureStore";
import { Provider } from "react-redux";

// check token command
import { userAuthCheckTokenCommand } from "./store/slices/user";

// check token init (before any thing)
store.dispatch(userAuthCheckTokenCommand());

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
   <Provider store={store}>
      <App />
   </Provider>
);
