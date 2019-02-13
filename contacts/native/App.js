import React from "react";
import { Provider } from "react-redux";
import configureStore from "./configureStore";

const store = configureStore();

import AppNavigator from "./routes";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
