// import logo from './logo.svg';
// import './App.css';
import React from "react"
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import RealHome from "./pages/RealHome"
import Home from "./pages/Home"


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



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header"></header>
//       <Home />
//     </div>
//   );
// }

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={RealHome} />
          <Route exact path='/games' component={Home} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
       </ApolloProvider>
  );
}




export default App;
