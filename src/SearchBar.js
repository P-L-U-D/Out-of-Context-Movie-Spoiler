import React, { Component } from 'react';
import GifDisplay from './GifDisplay';
import axios from 'axios';



        
//         // randomly pick 3 words and save
//         // wrap calls in async fucnction? use await to get response from API 1 before we call API 2
//         // on successful return of API 2, pass saved keywords to GifDisplay component & trigger view switch

//         // ERROR CATCH: when user types in empty string, don't submit the call & prompt user to write a word
//         // ERROR CATCH: if user types in a string that is not a direct match, return closest possible match
//             // STRETCH GOAL: instead of closest match, return a list of possible matches and allow the user to pick the one they want
//         // ERROT CATCH: NO NUMBERS! people work the regex magic


class SearchBar extends Component {
    constructor() {
        super();
        this.state = {
            movieSearch: [],
            movieID: [],
            keywordSearch: [],
            moviedbAPI: 'b588f737df1d6878d6133a1a7e0bface',
            giphyAPI: 'NShPdQTfWnvbvgxLo7Jd7C5qDeFfrsLR',
            userInput: ""
        }
    }

    randomIndex = (array) => {
        const index = Math.floor(Math.random() * array.length);
        return array[index]
    }

    randomThree = (array) => {
        let one = this.randomIndex(array);
        let two = this.randomIndex(array);
        let three = this.randomIndex(array);
        if (one === two || one === three) { one = this.randomIndex(array) }
        if (two === one || two === three) { two = this.randomIndex(array) }
        if (three === two || three === one) { three = this.randomIndex(array) }
        const newArray = []
        newArray.push(one, two, three)
        return newArray
    }

    getMovie = (event) => {
        event.preventDefault();
        // API CALL 1: movie search based on user's search 
        // return the MovieID (also have access to movie details)
        axios({
            url: 'https://api.themoviedb.org/3/search/movie?',
            params: {
                method: `GET`,
                responseType: `json`,
                api_key: this.state.moviedbAPI,
                query: `${this.state.userInput}`,
                include_adult: 'false',
                page: 1
            }
        })
        .then((res) => {
            let popularity = 0

            let movieObject;
            
            res.data.results.forEach( (i) => {
                if(i.popularity > popularity) {
                    movieObject = i
                    popularity = i.popularity
                }
            })
            
            //API call 2, return keywords based on query search from API call 1
            axios({
                url: `https://api.themoviedb.org/3/movie/${movieObject.id}/keywords?`,
                params: {
                    api_key: 'b588f737df1d6878d6133a1a7e0bface',
                }
            })
            .then((res) => {
                const keywordID = res.data.keywords.map( (keyword) => {
                    return keyword.name
                })
            
                const newKeyWords = this.randomThree(keywordID);

                this.setState({
                    keywordSearch: newKeyWords
                })
                
                console.log(newKeyWords);
            })
            
            this.setState({
                movieSearch: movieObject
            })
            console.log(movieObject);
        }).catch(error => {
            console.log('something went wrong');
        })
    }
    

    handleUserInput = (event) => {
        this.setState({
            userInput: event.target.value
        })
    }

    render() {
        // Just a search bar (text input)
        // console.log(this.state.keywordSearch);
        return (
            
            <div>
                <form onSubmit={this.getMovie} action="">
                    <label htmlFor=""></label>
                    <input onChange={this.handleUserInput} type="text"
                        placeholder="e.g. Fight Club"
                        id="" required />
                    <button type="submit">Search</button>
                </form>

                {
                   this.state.keywordSearch === [] 
                   ? null 
                   : <GifDisplay  gifWords={this.state.keywordSearch} gifTest='bear'/>
                }

            </div>
        
        )
    }
}

export default SearchBar;




