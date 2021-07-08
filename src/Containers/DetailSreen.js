import React, { Component } from "react";
import axios from "../axios";
import { ROOT_API } from '../statics';
import Loading from "../Components/Loading";
import MovieImage from "../Components/MovieImage";
import TextArea from "../Components/TextArea";
import NavBar from "../Components/NavBar";

import { Alert } from 'reactstrap';


class DetailScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false, movieId: this.props.match.params.movieId,
            loading: false,
            banner1Css: { color: "#FFF", backgroundColor: "green" },
            banner2Css: { color: "#000", backgroundColor: "grey", fontFamily: "arial" },
            banner3Css: { color: "#FFF", backgroundColor: "red", fontSize: 20 }
        };

        this.onDismiss = this.onDismiss.bind(this);
    }


    componentDidMount() {
        axios
            .get(`${ROOT_API}/api/movies/${this.props.match.params.movieId}`)
            .then(response => {
                this.setState({
                    movie: response.data.movie,
                    movietitle: response.data.movie.title,
                });
                axios
                    .put(`${ROOT_API}/api/movies/${this.props.match.params.movieId}`, {
                        luotlike: response.data.movie.like.length
                    }
                    )
                    .then(response => {
                        // this.setState({
                        //     movie: response.data.movie,

                        // });
                        // window.location.href = `http://localhost:3000/movies/${this.props.match.params.movieId}`
                        console.log(response);


                    })
                    .catch(err => console.error(err))
            })
            .catch(err => console.error(err));

    }

    _updateReview = (content) => {

        const movie = this.state.movie;
        let reviews = movie.review;
        reviews.push({
            user: { name: this.props.username },
            content: content
        });
        movie.reviews = reviews;
        this.setState({
            review: content
        })
    }

    addActor = (actor) => {
        this.setState({
            loading: true,

        });
        const { movie } = this.state;
        console.log(actor, movie)
        axios
            .put(`${ROOT_API}/api/movies/${this.props.match.params.movieId}`, {
                actor: actor
            }
            )
            .then(response => {
                // this.setState({
                //     movie: response.data.movie,
                axios
                    .put(`${ROOT_API}/api/actors/${actor}`, {
                        movie: this.props.match.params.movieId
                    }
                    )
                    .then(response => {


                        // window.location.href = `http://localhost:3000/movies/${this.props.match.params.movieId}`



                    })
                    .catch(err => console.error(err));
                // });      

                if (response.data.success) {
                    this.setState({
                        visible: true,
                        loading: false
                    });

                    window.location.href = `https://imdb-mini.xyz/movies/${this.props.match.params.movieId}`
                }




            })
            .catch(err => console.error(err));
    }
    addLike = (like) => {
        const { movie } = this.state;
        axios
            .put(`${ROOT_API}/api/movies/${this.props.match.params.movieId}`, {
                like: like,
                listmovie: this.props.movieLike
            }
                
            )
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        visible: true,
                        loading: false
                    });

                    window.location.href = `https://imdb-mini.xyz/movies/${this.props.match.params.movieId}`
                }




            })
            .catch(err => console.error(err));
    }
    onDismiss() {
        this.setState({ visible: false });
    }
    render() {
        const { loading } = this.state;
        return (
            <div>
                <NavBar

                    onSearchChanged={this._onSearchChanged}
                    onNameSignin={this.props.onNameSignin}
                    onCMTSignin={this.props.onCMTSignin}
                    username={this.props.username}
                    onLogin={this.props.onLogin}
                />
                <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
                    Cap nhat actor thanh cong
      </Alert>
                {loading ? <div className="text-center"><Loading /></div>
                    :

                    <div className="main_content container">
             
                        
                        <div className="row">
                            <div className="col-8 mr-auto ml-auto">
                                {this.state.movie ?
                                    <MovieImage
                                        addActor={this.addActor}
                                        addLike={this.addLike}
                                        movieId={this.state.movieId}
                                        movie={this.state.movie}
                                        username={this.props.username}
                                        onLogin={this.props.onLogin}
                                    />
                                    : ""}
                                <TextArea
                                    username={this.props.username}
                                    onLogin={this.props.onLogin}
                                    movieId={this.state.movieId}
                                    review={this.state.review}
                                    movie={this.state.movietitle}
                                    updateReview={this._updateReview}
                                />

                            </div>
                        </div>
                    </div>
                }
            </div>

        );
    }
}

export default DetailScreen;