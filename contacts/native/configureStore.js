import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import appReducer from "./reducers/index";

export default function configureStore(preloadedState) {
  return createStore(
    appReducer,
    preloadedState,
    compose(applyMiddleware(thunkMiddleware))
  );
}
