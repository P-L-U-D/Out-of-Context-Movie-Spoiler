import React, { Component } from 'react';
import axios from 'axios';


class GifDisplay extends Component {
    constructor() {
        super();
        this.state = {
            gifs: [],
            errorMessage: ''
        }
    }

    apiCall = (keyword) => {
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

    getGif = async (keyword1, keyword2, keyword3) => {
        const [gif1, gif2, gif3] = await Promise.all([this.apiCall(keyword1), this.apiCall(keyword2), this.apiCall(keyword3)])

        const gifs = []
        
        gifs.push(gif1.data.data, gif2.data.data, gif3.data.data)

        this.setState({
            gifs
        })
    } 

    componentDidMount() {
        console.log('did mount')
    // API CALL 3: return 3 gifs based of the keywords we get from API 2
    // save gifs and display onto the page
        this.getGif(...this.props.gifWords).catch(() => {
            this.setState({
                errorMessage: 'I am so sorry, but no gifs for you right now. I am sick.'
            })
        });
    }

    componentDidUpdate( prevProps ) {
        console.log('did update', prevProps, this.props)
        if (prevProps.gifsWords !== this.props.gifsWords) {
            console.log('running')
            this.getGif(...this.props.gifWords).catch(() => {
                this.setState({
                    errorMessage: 'I am so sorry, but no gifs for you right now. I am sick.'
                })
            });
        }
        // console.log(prevProps)
    }

    render() {
        // display 3 GIFS in horizontal line
        // MAYBE: include keywords that apply to the gift (in a title attribute or label below)
        // include a back button that returns user to search bar "home page" 
        return (
            <div className="wrapper">
                {this.state.gifs.map(items => {
                    return(
                        <div className="gif-container" key={items.id}>
                            <img src={items.images.fixed_width.url} alt=""/>
                        </div>
                    )
                })}
                {this.state.errorMessage === '' ? null : <p>{this.state.errorMessage}</p> }
            </div>
        )
    }
}



export default GifDisplay;