import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Navbar from "../components/Navbar";
import RealHome from "./RealHome";

// console.log(React)
// console.log(Game)

const Home = () => {
  return (
      <>
        <RealHome />
        <Navbar />
      </>
  );
};

export default Home;
