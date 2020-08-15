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
    // wrap calls in async fucnction? use await to get response from API 1 before we call API 2
    // on successful return of API 2, 

    console.log('did mount.')
    }

    render() {
        return (
            <></>
        )
    }
}



export default SearchBar;