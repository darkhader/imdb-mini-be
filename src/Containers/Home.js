import React, { Component } from 'react'
import axios from "../axios";
import { ROOT_API } from '../statics';
import NavBar from "../Components/NavBar";
import { Link } from "react-router-dom";
export default class Home extends Component {
    state = {
        reviews: []
    }
    componentDidMount() {
        axios
            .get(`${ROOT_API}/api/reviews`, {

            }
            )
            .then(response => {
                this.setState({
                    reviews: response.data.reviews


                });



            })
            .catch(err => console.error(err))
    }
    render() {
        const reviewsMovie = this.state.reviews
            ? this.state.reviews.map(review => (




                <li className="col-5" key={review._id}>{
                    review.movie ? <Link to={`/movies/${review.movie}`}>


                        <p>{review.username} đã viết bài Review ở phim {review.movietitle}</p>


                    </Link> : ""
                }


                </li>
            ))
            : "";
        const reviewsActor = this.state.reviews
            ? this.state.reviews.map(review => (




                <li className="col-5" key={review._id}>
                    {
                        review.actor ?
                        <Link to={`/actors/${review.actor}`}>
                            <p>{review.username} đã viết bài Review ở diễn viên {review.actorname}</p>




                        </Link>: ""
                    }

                </li>
            ))
            : "";
        return (
            <div >
                <NavBar


                    onNameSignin={this.props.onNameSignin}
                    onCMTSignin={this.props.onCMTSignin}
                    username={this.props.username}
                    onLogin={this.props.onLogin}
                />
                <h2>Các Reviews</h2>
                <ul className="reviewhome " style={{ width: "700px", height: "500px", overflow: " auto", textAlign: "center" }}>
                    {reviewsMovie}
                    {reviewsActor}
                </ul>
            </div>
        )
    }
}
