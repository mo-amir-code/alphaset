# Alphaset

Alphaset is a versatile package designed to streamline setup and enhance development workflows in Next.js and React.js applications. It offers rapid configuration for integrating Context API, Redux Toolkit, and Tailwind CSS, ensuring efficient project setup and management.

## Upcoming Features

Stay tuned for upcoming updates aimed at further enhancing integration capabilities, optimizing performance, and introducing new functionalities similar to those already included..


# Installation

First install the package with help of npm in your ReactJs or NextJs project.

```console
$ npm install alphaset
```


Now enter alphaset in your terminal and press enter

```console
$ alphaset
```

Now, respond to the questions based on your configuration and setup needs to finalize the package.

## Wrap Your App

If you are setting up Context API or Redux Toolkit with the 'alphaset' package, ensure to wrap your Next.js or React.js app with the appropriate Context and Redux Provider. Import 'store', 'Provider', and 'CountContextProvider'

```
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { CountContextProvider } from "./context/count/countContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CountContextProvider>
        <App />
      </CountContextProvider>
    </Provider>
  </React.StrictMode>
);
```