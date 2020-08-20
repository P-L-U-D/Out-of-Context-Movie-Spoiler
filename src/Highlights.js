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

   removeSubmission = (postRemoval) => {
      const dbRef = firebase.database().ref('savedResults');
      dbRef.child(postRemoval).remove();
   }


   render () {
      return (
         <div className="addedUserReview">
            { 
               this.state.savedResults.map((gifObject) => {
                  return (
                     <div key={gifObject.id} className="addedUserReview">
                        <h2 >{gifObject.movieTitle}</h2>
                        <div>
                           <div className="gif-container">
                              <img src={gifObject.gif[0].images.fixed_width.url} alt={gifObject.gif[0].title}/>
                           </div>
                           <div className="gif-container">
                              <img src={gifObject.gif[1].images.fixed_width.url} alt={gifObject.gif[1].title}/>
                           </div>
                           <div className="gif-container">
                              <img src={gifObject.gif[2].images.fixed_width.url} alt={gifObject.gif[2].title}/>
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





