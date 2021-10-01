import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import Navbar from "../components/Navbar";
import ApolloClient from "apollo-boost";
import RealHome from "./RealHome";

const Home = () => {
  return (
    <Router>
        <RealHome />
        <Navbar />
    </Router>
  );
};

export default Home;
