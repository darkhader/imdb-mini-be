import React, { Component } from 'react'
import axios from "../axios";
import YouTube from 'react-youtube';

export default class Trailer extends Component {

    state = {

        search: "",
        visible: "visible",
        visible1: "visible"
    }
    componentDidMount() {

        if (this.props.title) {
            axios
                .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${this.props.title + "trailer"}'&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`)
                .then(data => {
                    const items = data.data.items;
                    for (let i = 0; i < items.length; i++) {
                        let item = items[i];
                        this.setState({
                            search: item.id.videoId
                        });

                    }




                })
                .catch(err => console.error(err));
        }




    }
    _onClick = (event) => {
        this.setState({
            visible: "hidden"
        })
    }
    _onClick1 = (event) => {
        this.setState({
            visible1: "hidden"
        })
    }
    render() {

        const opts = {
            height: '390',
            width: '730',
            playerVars: {
                autoplay: 1
            }
        };
        return (
            this.props.hiddenReview ? "" :

                <div style={{ position: "relative" }} >
                    <h2>Trailer</h2>
                    <YouTube
                        videoId={this.state.search}
                        opts={opts}
                        onReady={this._onReady}
                    />
                </div>
        )
    }
}
