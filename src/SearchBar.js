import React, { Component } from 'react';
import axios from 'axios';



class SearchBar extends Component {
    constructor() {
        super();
        this.state = {
            placeholder: []
        }
    }

    componentDidMount() {
    // API CALL 1: movie search based on user's search 
        // return the MovieID (also have access to movie details)
    // API CALL 2: based on MovieID from call 1 
        // return array of keywords
        // randomly pick 3 words and save
    // wrap calls in async fucnction? use await to get response from API 1 before we call API 2
    // on successful return of API 2, pass saved keywords to GifDisplay component & trigger view switch

    // ERROR CATCH: when user types in empty string, don't submit the call & prompt user to write a word
    // ERROR CATCH: if user types in a string that is not a direct match, return closest possible match
        // STRETCH GOAL: instead of closest match, return a list of possible matches and allow the user to pick the one they want
    // ERROT CATCH: NO NUMBERS! people work the regex magic

    console.log('did mount.')
    }

    render() {
        // Just a search bar (text input)
        return (
            <></>
        )
    }
}



export default SearchBar;