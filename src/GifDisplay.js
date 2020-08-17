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

    componentDidMount() {
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

        const getGif = async (keyword1, keyword2, keyword3) => {
            const [gif1, gif2, gif3] = await Promise.all([apiCall(keyword1), apiCall(keyword2), apiCall(keyword3)])
            // console.log('', gif1, gif2, gif3);
            const gifs = []

            gifs.push(gif1.data.data, gif2.data.data, gif3.data.data)

            // console.log(gifs)
            this.setState({
                gifs
            })
        }
        console.log(this.props.gifWords);
        // let iHateThis = this.props.gifwords
        getGif('bears', 'beats', 'battle star galactica').catch(() => {
            this.setState({
                errorMessage: 'I am so sorry, but no gifs for you right now. I am sick.'
            })
        });

        // API CALL 3: return 3 gifs based of the keywords we get from API 2
        // save gifs and display onto the page
    }

    render() {
        // display 3 GIFS in horizontal line
        // MAYBE: include keywords that apply to the gift (in a title attribute or label below)
        // include a back button that returns user to search bar "home page" 
        return (
            <div className="wrapper">
                {this.state.gifs.map(items => {
                    return (
                        <div className="gif-container" key={items.id}>
                            <img src={items.images.fixed_width.url} alt="" />
                        </div>
                    )
                })}
                {this.state.errorMessage === '' ? null : <p>{this.state.errorMessage}</p>}
            </div>
        )
    }
}



export default GifDisplay;