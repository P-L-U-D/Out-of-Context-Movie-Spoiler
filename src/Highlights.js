import React, { Component } from 'react';
import firebase from './firebase'

class Highlights extends Component {

   constructor() {
      super();
      this.state = {
         savedResults: []
      }
   }

   componentDidMount() {
   //retrieving the saved gifs that user selected from the database
      const dbRef = firebase.database().ref('savedResults');
      dbRef.on('value', (snapshot) => {
         let savedResults = snapshot.val();
         let newState = [];
         for (let key in savedResults) {
            newState.push({
            id: key,
            movieTitle: savedResults[key].movieTitle,
            gif: savedResults[key].gifs
            });
         }
         this.setState({
            savedResults: newState
         });
      });
   }

// user is able to remove the saved gif from the database
   removeSubmission = (postRemoval) => {
      const dbRef = firebase.database().ref('savedResults');
      dbRef.child(postRemoval).remove();
   }


   render () {
      //displaying the database with all the gifs that the user has saved 
      return (
         <div className="highlights">
            { 
               this.state.savedResults.map((gifObject) => {
                  return (
                     <div key={gifObject.id} className="saved-snapshot">
                        <h2 >{gifObject.movieTitle}</h2>
                        <div className="display-box">
                           <div className="gif-container">
                              <img src={gifObject.gif[0].images.fixed_width.url} alt={gifObject.gif[0].title} tabindex="0"/>
                           </div>
                           <div className="gif-container">
                              <img src={gifObject.gif[1].images.fixed_width.url} alt={gifObject.gif[1].title} tabindex="0"/>
                           </div>
                           <div className="gif-container">
                              <img src={gifObject.gif[2].images.fixed_width.url} alt={gifObject.gif[2].title} tabindex="0"/>
                           </div>
                        </div>
                        <button onClick={ () => this.removeSubmission(gifObject.id)}>Remove</button>
                     </div>
                  )
               }) 
            }
         </div>
      )
   
   }
}
export default Highlights





