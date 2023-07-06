import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import App from "./routes";
import { client } from "./apolloClient";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </ApolloProvider>
);
