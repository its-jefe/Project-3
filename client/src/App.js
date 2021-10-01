// import logo from './logo.svg';
// import './App.css';
import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import Home from "./pages/Home";
import GamePage from "./pages/GamePage.js";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/gamepage" component={GamePage} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;