import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './components/Home';
import Settings from './components/Settings';

import './App.css';

function App() {
  const userId = 1; // TODO: make dynamic

  return (
    <div className='App'>
      <Router>
        <nav className='main-nav'>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              Hello, Someone
              {/* <Link to="/authenticate">Login With Fb</Link> */}
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/about">
            {/* <About /> */}
          </Route>
          <Route path="/settings">
            <Settings userId={userId} />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route><h3>404 - Not found</h3></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
