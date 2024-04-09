import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.js";
import { PersistGate } from "redux-persist/es/integration/react";
import { NextUIProvider } from "@nextui-org/react";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import {Toaster} from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NextUIProvider>
        <SocketContextProvider>
          <App />
          <Toaster/>
        </SocketContextProvider>
      </NextUIProvider>
    </PersistGate>
  </Provider>
);
