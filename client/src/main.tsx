import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "modern-normalize";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "./components/Loader/Loader";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
