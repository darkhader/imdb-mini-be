import React, { Component } from "react";
import MovieImage from "./MovieImage";

import { Link } from "react-router-dom";

class RecMovie extends Component {
    render() {
        const { addActor, addLike, _id } = this.props;

        const allMovieImages = this.props.movies.length > 0 && this.props.movies?.map((movie, index) => {
            if (_id === movie._id || index > 4) return null
            return (
                <div key={movie._id} className="col-2 anhnho" style={{ marginRight: '50px' }}>
                    <Link to={`/movies/${movie._id}`}>
                        <MovieImage
                            hiddenReview={true}
                            addActor={addActor}
                            addLike={addLike}
                            movie={movie} />
                    </Link>
                </div>
            )
        });

        return (
            <div className="rec-movie">
                <div className="row">{allMovieImages}</div>
            </div>
        );
    }
}

export default RecMovie;