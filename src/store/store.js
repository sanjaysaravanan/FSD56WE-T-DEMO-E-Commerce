// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cart.js";

// store to Local Storage
// Redux Middleware Fucntion
const storeToLocalStorage = (props) => {
  return (exe) => {
    return (action) => {
      const result = exe(action); // execute the action and return the result
      // statements here will be executed immediately after action completeion in redux

      console.log(props.getState());

      // result will have the next step
      localStorage.setItem("redux_store", JSON.stringify(props.getState()));

      return result;
    };
  };
};

const loadFromStorage = () => {
  if (localStorage.getItem("redux_store") !== null) {
    return JSON.parse(localStorage.getItem("redux_store"));
  }
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  devTools: true,
  middleware: (defaultMiddlewareFn) => {
    return [
      ...defaultMiddlewareFn(), // spread default middlewares from the fn
      storeToLocalStorage,
    ];
  },
  preloadedState: loadFromStorage(),
});

export default store;
