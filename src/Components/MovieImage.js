import React, { Component } from "react";
import RecMovie from "../Components/RecMovie";
import { ROOT_API } from '../statics';
import axios from "../axios";
import ActorInMovie from "./ActorInMovie";
import LikeDisLike from "./LikeDisLike";
import Trailer from "./Trailer";
class MovieImage extends Component {
    state = {
        moviesRecomended: [],

    };
    componentDidMount() {
        axios({
            url: `${ROOT_API}/api/movies/${this.props.movieId}`,
            method: "GET",

        }).then(response => {
            if (response) {
                this.setState({ moviesRecomended: response.data?.movieRecommend });
            }
        }).catch(error => {
            console.log(error)
        });

    }
    render() {

        console.log("🚀 ~ file: MovieImage.js ~ line 26 ~ MovieImage ~ render ~ this.props.movie", this.props.movie)
        const reviews = this.props.movie.review
            ? this.props.movie.review.map(review => (
                <p className="review" key={review._id}>

                    <span style={{ color: "pink", fontWeight: "bold", fontSize: "20px" }} className="font-weight-bold">{
                        review.user ? review.user.name : ""
                    }</span> : {" "}
                    {review.content}
                </p>
            ))
            : "";


        return (
            <div className="movie_image">
                <img
                    // style={{ width: "100%", height: "100%" }}
                    className="img-fluid text-center"
                    src={this.props.movie.image}
                    alt={this.props.movie.title}
                />
                <LikeDisLike
                    hiddenReview={this.props.hiddenReview}
                    movie={this.props.movie}
                    addLike={this.props.addLike} />
                <h2>{this.props.movie.title} 
                {
                    this.props.movie.year &&
                    <span>({this.props.movie.year})</span>
                }
                </h2>
                <div className="ml-2" >Thể loại:  {this.props.movie.description}</div>
                <div className="ml-2">Thời lượng: {this.props.movie.duration}</div>
                <Trailer
                    hiddenReview={this.props.hiddenReview}
                    title={this.props.movie.title} />
                <h2 className="rec-title">Phim gợi ý</h2>
                <RecMovie
                    movies={this.state.moviesRecomended}
                    _id={this.props.movie._id} />
                <ActorInMovie
                    hiddenReview={this.props.hiddenReview}
                    movie={this.props.movie}
                    addActor={this.props.addActor} />

                {this.props.hiddenReview ? "" : <p ><h2>Review</h2><br /> {reviews}</p>}

            </div>
        );
    }
}

export default MovieImage;