import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './components/Home';

import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <nav className='main-nav'>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <Link to="/authenticate">Login With Fb</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/about">
            {/* <About /> */}
          </Route>
          <Route path="/settings">
            {/* <Users /> */}
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
