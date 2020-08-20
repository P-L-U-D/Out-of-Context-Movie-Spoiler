import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route, 
  Link
} from 'react-router-dom';
import SearchBar from './SearchBar';
import Highlights from './Highlights.js'
import './styles/styles.scss'



class App extends Component {
  // imported SearchBar.js and rendered out the gifs in this return
  render() {
    return (
      <Router>
        <main>
          <header>
            <h1>Out of Context Spoiler</h1>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/highlights">Highlights</Link>
                </li>
              </ul>
            </nav>
          </header>
          <Route exact path="/" component={ SearchBar } />
          <Route exact path="/highlights" component={ Highlights } />
          <footer>
            <p className="copyright">Created by Juno College © 2020</p>
          </footer>
        </main>
      </Router>
    );
  }
}

export default App;