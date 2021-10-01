import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "../components/Game";

const GamePage = () => {
  return (
    <Router>
      <Game />;
    </Router>
  );
};

export default GamePage;
