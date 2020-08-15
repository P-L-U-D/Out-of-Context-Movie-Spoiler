import React, { Component } from 'react';


class GifDisplay extends Component {
    constructor() {
        super();
        this.state = {
            placeholder: {}
        }
    }

    componentDidMount() {
        console.log('did mount.')

        // API CALL 3: return 3 gifs based of the keywords we get from API 2
        // save gifs and display onto the page
    }

    render() {
        // display 3 GIFS in horizontal line
        // MAYBE: include keywords that apply to the gift (in a title attribute or label below)
        // include a back button that returns user to search bar "home page" 
        return (
            <></>
        )
    }
}



export default GifDisplay;