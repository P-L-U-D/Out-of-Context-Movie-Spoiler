import React, { Component } from 'react';
// import randomizer from './randomizer';
import SearchBar from './SearchBar';
import './styles/styles.scss'



class App extends Component {
  // imported SearchBar.js and rendered out the gifs in this return
  render() {
    return (
        <div className="test">
          {/* <header> */}
            <h1>Out of Context Spoiler</h1>
          {/* </header> */}
          <h3>Search a movie and get gifs!</h3>
          <SearchBar />
          <footer>
            <p className="copyright">Created by Juno College © 2020</p>
          </footer>
        </div>
      
    );
  }
}

export default App;
