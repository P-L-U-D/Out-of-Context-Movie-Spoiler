import React, { Component } from 'react';
// import SearchBar from './SearchBar';
// import GifDisplay from './GifDisplay';
// import randomizer from './randomizer';
import './styles/styles.scss'

// Get 3 Api calls
//   - Api 1 movie search based on user's search we get movie id
//     - Api 2 based movie id we get a list of keywords
//       - filter giphy api based of the keywords we get
// All the apis are going to be one after the other(synchronous)
// Display data on the page
// Need two views
//   - View 1: Search bar will have api #1(moviedatabase)
//     - View 2: Giphy api
// Components
//   - 2 Components
//     - First component search bar / landing page
//       - Second component display giphy
// Error Handling
//   - error state when call comes back false
//     - have to make sure that user inputs something in the search bar
//       - no Numbers!!
// Stretch Goals
//   - save and delete options
//     - accessing my save section and giving user's their own section
//       - allowing user to choose which gif to delete gif and re - randomize(maybe another api call ?)

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>bullshit title</h1>
      </div>
    );
  }
}

export default App;
