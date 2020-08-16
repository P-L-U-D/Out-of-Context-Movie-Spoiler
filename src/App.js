import React, { Component } from 'react';
// import randomizer from './randomizer';
import SearchBar from './SearchBar';
import GifDisplay from './GifDisplay';
import './styles/styles.scss'
import SearchBar from './SearchBar';


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
      <div className="App">
        <h1>bullshit title</h1>
        <SearchBar />
      </div>
    );
  }
}

export default App;
