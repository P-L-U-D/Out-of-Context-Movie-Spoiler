import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route, 
  Link
} from 'react-router-dom';
import SearchBar from './SearchBar';
import Highlights from './Highlights.js'
import './styles/styles.scss'



// Components
//   - 2 Components
//     - First component search bar / landing page
//     - Second component display giphy
// Error Handling
//   - error state when call comes back false
//     - have to make sure that user inputs something in the search bar
//       - no Numbers!!
// Stretch Goals
//   - save and delete options
//   - accessing my save section and giving user's their own section
//   - allowing user to choose which gif to delete gif and re - randomize(maybe another api call ?)

class App extends Component {
  // MVP: Need two views:
    // Homepage: Title, instructions
    // View 1: Search Bar
      // part of the homepage, just a large text input
    // View 2: Giphy Display
      // branches off homepage, instructions are hidden and search bar is small and moved
      // gif display takes front and center

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
