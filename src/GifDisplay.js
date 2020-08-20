import React, { Component, Fragment } from 'react';
import axios from 'axios';
import firebase from './firebase.js'
import Highlights from './Highlights.js'



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
    handleSubmit() {
        const dbRef = firebase.database().ref('savedResults');
        const savedResult = {
            movieTitle: this.props.movieTitle,
            gifs: this.state.gifs
        }
        dbRef.push(savedResult);
    }

    // Users can select any individual gif to generate a different one
    moreGifs = (event, index) => {
        console.log(event.target.dataset.keyword);

        const chosenGif = event.target.dataset.keyword
        // console.log(chosenGif);

        axios({
            url: 'https://api.giphy.com/v1/gifs/random',
            method: 'GET',
            dataResponse: 'json',
            params: {
                api_key: 'NShPdQTfWnvbvgxLo7Jd7C5qDeFfrsLR',
                tag: chosenGif
            }
        }).then((result) => {
            const funGif = result.data.data
            const newGifsArray = [...this.state.gifs]
            newGifsArray[index] = funGif

            this.setState({
                gifs: newGifsArray
            })
        })
    }

    render() {
        // display 3 GIFS in horizontal line
        // MAYBE: include keywords that apply to the gift (in a title attribute or label below)
        // include a back button that returns user to search bar "home page" 
        return (
            <Fragment>
                <div className="wrapper gif-display">
                    <h2>{this.props.movieTitle}</h2>
                    <div className="gif-box">
                        {this.state.gifs.map((items, index) => {
                            return (
                                <div className="gif-container" key={items.id}>
                                    <img onClick={(event) => this.moreGifs(event, index)} src={items.images.fixed_width.url} data-keyword={this.props.gifWords[index]} alt="" />
                                </div>
                            )
                        })}
                        {this.state.errorMessage === '' ? null : <p>{this.state.errorMessage}</p>}
                    </div>
                </div>
                <button onClick={this.handleSubmit}>Save to My Gifs</button>
                <Highlights />
            </Fragment>
        )
    }
}
export default GifDisplay;