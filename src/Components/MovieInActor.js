import React, { Component } from "react";

import { ROOT_API } from '../statics';
import axios from "../axios";
import '../App.css';
import { Link } from "react-router-dom";
class MovieInActor extends Component {
    state = {
        movie: "",
        movies: []
    }
    componentDidMount() {
        axios
            .get(`${ROOT_API}/api/movies/`)
            .then(data => {
                this.setState({
                    movies: data.data.movies
                });


            })
            .catch(err => console.error(err));



    }
    render() {









        const movies = this.props.actor.movie
            ? this.props.actor.movie.map(movie => (

                this.props.hiddenReview ? "" :
                    <li className="col-3" key={movie._id}>
                        <Link to={`/movies/${movie._id}`}>
                          

                        

                        <img src={movie.image}
                            style={{ width: "95px", height:"140px" }}
                            className="img-fluid"
                        ></img>
                        </Link>
                    </li>
            ))
            : "";




        // this.props.addActor( this.state.actor);

        return (
            this.props.hiddenReview ? "" :
                <div className="container">
                <h2>Phim đã đóng</h2>
                    <ul className="movie_image row" style={{width: "1050", height: "200px", overflow:" auto"}}>
                        {movies}
                    </ul>

                </div>


        );
    }
}

export default MovieInActor;