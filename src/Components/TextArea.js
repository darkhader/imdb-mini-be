import React, { Component } from 'react';
import axios from '../axios';
import { ROOT_API } from '../statics';
class TextArea extends Component {
    state = {
        review: ""
    }
    _onSubmitReview = (event) => {
        event.preventDefault();
        const { review, movieId, userId,movie } = this.props;
        console.log("review", review);
        axios
        .get(`${ROOT_API}/api/auth/`)
        .then(response => {
            console.log("res",response.data.userFound.name)
            // this.setState
            axios
            .post(`${ROOT_API}/api/reviews/`,{
                content: this.state.review,
                movie: movieId,
                user: response.data.userFound.id,
                username:response.data.userFound.name,
                movietitle:movie
            })
            .then(response => {
                this.props.updateReview(this.state.review);
                this.setState({review:""})
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            });
        })
        .catch(err => {
            console.log(err)
        });

       
    }
 
    

    render() {
        return (
            <form onSubmit={this._onSubmitReview}>
                <div className="form-group">
                    <label>Add review: </label>
                    <input
                        value={this.state.review}
                        className="form-control"
                        rows="2"
                        onChange={(event) => {
                            // this.props.updateReview(event.target.value);
                            this.setState({ review: event.target.value });
                        }}
                    >
                    </input>
                </div>
                <div className="d-flex justify-content-center">
                    <button
                    // onClick={this._onSubmitReview}
                        className="btn btn-primary"
                    >Submit
                    </button>
                </div>
            </form>
        );
    }
}

export default TextArea;