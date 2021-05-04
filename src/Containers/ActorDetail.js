import React, { Component } from "react";
import axios from "../axios";
import { ROOT_API } from '../statics';
import NavBar from "../Components/NavBar";
import MovieImage from "../Components/MovieImage";
import TextAreaActor from "../Components/TextAreaActor";
import ActorImage from "../Components/ActorImage";

class ActorDetail extends Component {
    state = {
        actorId: this.props.match.params.actorId
    };

    componentDidMount() {
        console.log(this.state.actorId);
        
        axios
            .get(`${ROOT_API}/api/actors/${this.props.match.params.actorId}`)
            .then(response => {
                console.log(response.data.actor);
                
                this.setState({
                    actor: response.data.actor,
                    actorname: response.data.actor.name,

                });
                axios
                    .put(`${ROOT_API}/api/actors/${this.props.match.params.actorId}`, {
                        luotlike: response.data.actor.like.length
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

        const actor = this.state.actor;
        let reviews = actor.review;
        reviews.push({
            user: { name: this.props.username },
            content: content
        });
        actor.reviews = reviews;
        this.setState({
            review: content
        })
    }


    addLike = (like) => {
        const { actor } = this.state;
        console.log(like, actor)
        axios
            .put(`${ROOT_API}/api/actors/${this.props.match.params.actorId}`, {
                like: like
            }
            )
            .then(response => {

                window.location.href = `https://imdb-mini.xyz/actors/${this.props.match.params.actorId}`



            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div>
                <NavBar
                  onSearchChanged={this._onSearchChanged}
                  onNameSignin={this.props.onNameSignin}
                  onCMTSignin={this.props.onCMTSignin}
                  username={this.props.username}
                  onLogin={this.props.onLogin}
                />
                <div className="main_content container">
                    <div className="row">
                        <div className="col-6 mr-auto ml-auto">
                            {this.state.actor ?
                                <ActorImage

                                    addLike={this.addLike}
                                    actorId={this.state.actorId}
                                    actor={this.state.actor}
                                    username={this.props.username}
                                    onLogin={this.props.onLogin}
                                />
                                : ""}
                            <TextAreaActor
                                username={this.props.username}
                                onLogin={this.props.onLogin}
                                actorId={this.state.actorId}
                                review={this.state.review}
                                actor={this.state.actorname}
                                updateReview={this._updateReview} />

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ActorDetail;