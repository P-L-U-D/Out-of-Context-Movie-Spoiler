import React, { Component, Fragment } from 'react';
import GifDisplay from './GifDisplay';
import randomThree from './randomizer';
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
            errorMessage: '',
            movieSearch: [],
            backupOptions: [],
            movieID: [],
            keywordSearch: [],
            keywordResults: [],
            moviedbAPI: 'b588f737df1d6878d6133a1a7e0bface',
            giphyAPI: 'NShPdQTfWnvbvgxLo7Jd7C5qDeFfrsLR',
            userInput: "",
            toggleBackups: false,
            toggleGifDisplay: false
        }
    }



    getMovie = (event) => {
        event.preventDefault();
        this.setState({
            toggleBackups: false,
            toggleGifDisplay: false,
            backupOptions: [],
            keywordSearch: []
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
                // include_adult: 'false',
                page: 1
            }
        })
            .then((res) => {
                console.log(res.data.results);

                const match = res.data.results.filter((movie) => {
                    return movie.title === this.state.userInput

                })

                const backupOptions = res.data.results.filter((movie) => {
                    return movie.popularity > 10
                })
                console.log(match, backupOptions)
                if (match.length === 1) {
                    this.setState({
                        movieSearch: match,
                        toggleGifDisplay: true
                    })
                } else if (match.length === 0 && backupOptions.length === 0) {
                    this.setState({
                        errorMessage: 'That doesn\'t seem to be a movie. Why don\'t you try another one?',
                        movieSearch: [],
                        keywordSearch: [],
                        toggleBackups: true
                    })
                } else {
                    this.setState({
                        errorMessage: 'Sorry, which movie were you looking for?',
                        backupOptions,
                        movieSearch: [],
                        keywordSearch: [],
                        toggleBackups: true
                    })
                }

                //API call 2, return keywords based on query search from API call 1
                axios({
                    url: `https://api.themoviedb.org/3/movie/${this.state.movieSearch[0].id}/keywords?`,
                    params: {
                        api_key: 'b588f737df1d6878d6133a1a7e0bface',
                    }
                })
                    .then((res) => {
                        const words = res.data.keywords.map((data) => {
                            return data.name
                        })

                        // Filtering out bad or generic keywords
                        const approvedWords = words.filter((e) => {
                            const badWords = /(based)|(graphic)|(book)|(aftercreditsstinger)|(3d)|(young)|(novel)|(adult)|(comic)|(true story)|(aftercreditsstinger)|(film)|(imax)|(violence)|(film)|(musical)|(director)|(duringcreditsstinger)|(avengers)|(marvel)/g
                            
                            if (badWords.test(e)) {
                                return false
                            } else {
                                return e
                            }
                        })
                        console.log(approvedWords);

                        const newKeyWords = randomThree(approvedWords);

                        this.setState({
                            userInput: '',
                            keywordSearch: newKeyWords,
                            keywordResults: words
                        });
                    })
            }).catch(error => {

            })
    }


    handleUserInput = (event) => {
        event.preventDefault();
        this.setState({
            userInput: event.target.value
        })
    }
    //back-up option function
    backupSelection = (event) => {
        const chosenMovie = this.state.backupOptions.filter((backup) => {
            const targetId = parseInt(event.target.id)
            return backup.id === targetId
        })

        this.setState({
            backupOptions: [],
            toggleBackups: false,
            toggleGifDisplay: true,
            movieId: event.target.id,
            movieSearch: chosenMovie,
            userInput: ""
        },
            () => {
                axios({
                    url: `https://api.themoviedb.org/3/movie/${this.state.movieSearch[0].id}/keywords?`,
                    params: {
                        api_key: 'b588f737df1d6878d6133a1a7e0bface',
                    }
                })
                    .then((res) => {
                        console.log(res.data.keywords);
                        const words = res.data.keywords.map((data) => {
                            return data.name
                        })

                        // Filtering out bad or generic keywords
                        const approvedWords = words.filter((e) => {
                            const badWords = /(based)|(graphic)|(book)|(aftercreditsstinger)|(3d)|(young)|(novel)|(adult)|(comic)|(true story)|(aftercreditsstinger)|(film)|(imax)|(violence)|(film)|(musical)|(director)|(duringcreditsstinger)|(avengers)|(marvel)/g

                            if (badWords.test(e)) {
                                return false
                            } else {
                                return e
                            }
                        })
                        console.log(approvedWords);

                        const newKeyWords = randomThree(approvedWords);

                        this.setState({
                            userInput: '',
                            keywordSearch: newKeyWords,
                            keywordResults: words
                        })
                    })
            })
    }

    render() {
        // Just a search bar (text input)
        return (

            <div className="wrapper" >
                <form onSubmit={this.getMovie} action="">
                    <label htmlFor=""></label>
                    <input value={this.state.userInput} onChange={this.handleUserInput} type="text"
                        placeholder="Type a movie"
                        id="" required />
                    <button type="submit">Search</button>
                </form>
                {
                    //displays the back up movie options to the page
                    this.state.toggleBackups === false
                        ? null
                        : <Fragment>
                            <div className="backupOptions">
                                <h2>{this.state.errorMessage}</h2>
                                {this.state.backupOptions.map((backup) => {
                                    return (
                                        <div key={backup.id} className="posterContainer">
                                            <img onClick={this.backupSelection} src={`https://image.tmdb.org/t/p/w200/${backup.poster_path}`} alt={`Movie poster for ${backup.title}`} id={backup.id} />
                                        </div>
                                    )
                                })}
                            </div>
                        </Fragment>
                }

                {
                    this.state.toggleGifDisplay === false
                        ? null
                        : <GifDisplay keywordResults={this.state.keywordResults} movieTitle={this.state.movieSearch[0].title} gifWords={this.state.keywordSearch} moreGifs={this.moreGifs} gifTest='bear' />
                }

            </div>

        )
    }
}

export default SearchBar;