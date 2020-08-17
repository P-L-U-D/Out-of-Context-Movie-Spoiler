import React, { Component } from 'react';
import GifDisplay from './GifDisplay';
import randomThree from './randomizer'
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
            userInput: "",
            toggleDisplay: false
        }
    }

    getMovie = (event) => {
        event.preventDefault();
        this.setState({
            toggleDisplay: false
        })
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
            // console.log(res.data)
            let popularity = 0

            let movieObject;
            
            res.data.results.forEach( (i) => {
                if(i.popularity > popularity) {
                    movieObject = i
                    popularity = i.popularity
                }
            })
            this.setState({
                movieSearch: movieObject
            })
            
            //API call 2, return keywords based on query search from API call 1
            axios({
                url: `https://api.themoviedb.org/3/movie/${movieObject.id}/keywords?`,
                params: {
                    api_key: 'b588f737df1d6878d6133a1a7e0bface',
                }
            })
            .then((res) => {
                // need a catch if there is less than three keywords
                // need to filter out bad words (imax, based on, comic/movie/book/film, graphic)
                // console.log(res.data)
                const keywordID = res.data.keywords.map( (keyword) => {
                    return keyword.name
                })
            
                const newKeyWords = randomThree(keywordID);

                this.setState({
                    keywordSearch: newKeyWords,
                    toggleDisplay: true
                })
                
                // console.log(newKeyWords);
            })
            
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
        console.log('render running')
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
                this.state.toggleDisplay === true
                ? <GifDisplay gifWords={this.state.keywordSearch} /> 
                : null
                }

            </div>
        
        )
    }
}

export default SearchBar;




