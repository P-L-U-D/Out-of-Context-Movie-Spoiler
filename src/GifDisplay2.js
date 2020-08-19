import React, { Component } from 'react';
import axios from 'axios';
import firebase from './firebase'
class GifDisplay extends Component {
   constructor() {
      super();
      this.state = {
         gifs: [],
         errorMessage: '',
         gifpicks: []
      }
   }
   //prevProp access to previous state in relation to this component
   componentDidUpdate(prevProps) {
      //checking if current gif words are same, then don't run function, only run if userInput
      if (this.props.gifWords === prevProps.gifWords) return;
      const getGif = async (keyword1, keyword2, keyword3) => {
         const [gif1, gif2, gif3] = await Promise.all([apiCall(keyword1), apiCall(keyword2), apiCall(keyword3)])
         // console.log('', gif1, gif2, gif3);
         const gifs = []
         gifs.push(gif1.data.data, gif2.data.data, gif3.data.data)
         // console.log(gifs)
         this.setState({
            gifs
         })
         // console.log(this);
      }
      console.log(this.props.gifWords);
      const apiCall = (keyword) => {
         return axios({
            url: 'https://api.giphy.com/v1/gifs/translate',
            method: 'GET',
            dataResponse: 'json',
            params: {
               api_key: 'NShPdQTfWnvbvgxLo7Jd7C5qDeFfrsLR',
               s: keyword
            }
         })
      }
      if (this.props.keywordResults.length === 1 || this.props.keywordResults.length === 2 || this.props.keywordResults === undefined || this.props.keywordResults.length === 0) {
         console.log('not enough keywords, running with title')
         const newGif = (keyword) => {
            return axios({
               url: 'https://api.giphy.com/v1/gifs/search',
               method: 'GET',
               dataResponse: 'json',
               params: {
                  api_key: 'NShPdQTfWnvbvgxLo7Jd7C5qDeFfrsLR',
                  q: keyword,
                  limit: 3
               }
            })
               .then((result) => {
                  console.log(result);
                  this.setState({
                     gifs: result.data.data
                  })
               })
         }
         return newGif(this.props.movieTitle)
      }
      else {
         console.log('random keywords running')
         return getGif(...this.props.gifWords).catch(() => {
            this.setState({
               errorMessage: 'I am so sorry, but no gifs for you right now. I am sick.'
            })
         });
      }
      //create saved info button 
      // console.log(this.props.gifTest);
      // API CALL 3: return 3 gifs based of the keywords we get from API 2
      // save gifs and display onto the page
   }
   handleSubmit(event, gifChoice) {
      event.preventDefault();
      const dbRef = firebase.database().ref('savedResults');
      const savedResult = {
         gifpicks: gifChoice
      }
      dbRef.push(item);
      this.setState({
         gifChoice: ''
      });
   }
   removeSubmission = (gifRemoval) => {
      const dbRef = firebase.database().ref('savedResults');
      dbRef.child(gifRemoval).remove();
   }
   //     gifDatabase = () => {
   //     const dbRef = firebase.database().ref('savedResults');
   //     dbRef.on('value', (snapshot) => {
   //       let savedResults = snapshot.val();
   //       let newState = [];
   //       for (let key in savedResult) {
   //         newState.push({
   //           id: key,
   //           title: savedResults[key].title,
   //           image: savedResults[key].user
   //         });
   //       }
   //       this.setState({
   //         savedResults: newState
   //       });
   //     });
   //   }
   render() {
      // display 3 GIFS in horizontal line
      // MAYBE: include keywords that apply to the gift (in a title attribute or label below)
      // include a back button that returns user to search bar "home page" 
      return (
         <div className="wrapper gif-display">
            <h2>{this.props.movieTitle}</h2>
            <div className="gif-box">
               {this.state.gifs.map(item => {
                  return (
                     <div className="gif-container" key={item.id}>
                        <img src={item.images.fixed_width.url} alt="" />
                        <button onClick={() => this.handleSubmit(item.id)}>Add Gif</button>
                        <button onClick={() => this.removeSubmission(item.id)}>Remove Gif</button>
                     </div>
                  )
               })}
               {this.state.errorMessage === '' ? null : <p>{this.state.errorMessage}</p>}
            </div>
         </div>
      )
   }
}
export default GifDisplay;