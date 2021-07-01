import React, { Component } from "react";

import { ROOT_API } from '../statics';
import axios from "../axios";
import '../App.css';
import { Button } from 'reactstrap';
class LikeDisLike extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userlike: ""
        }
    }

    _onClick = (event) => {


        event.preventDefault();
        axios({
            url: `${ROOT_API}/api/auth`,
            method: "GET",

        }).then(response => {

            if (response) {
                this.setState({
                    userlike: response.data.userFound.id

                })
                let m = 0;
                for (let i = 0; i < this.props.actor.like.length; i++) {
                    if (this.state.userlike === this.props.actor.like[i]) {
                        m = 1;
                    }
                    if (this.state.userlike !== this.props.actor.like[i]) {
                        m = 0;
                    }
                    // console.log( this.props.movie.like[i]);

                }
                console.log(this.props.actor.like);

                if (m === 0) {
                    this.props.addLike(this.state.userlike)
                }

                console.log(this.state.userlike);
            }


        }).catch(error => {

            console.log(error)


        });


    }


    render() {


        return (


            <div className="like">



                <button onClick={this._onClick} type="button" className="btn btn-info">
                    <span className="glyphicon glyphicon-triangle-top"></span>
                </button>
                <span>          {this.props.actor.like && this.props.actor.like.length}</span>


            </div>





        )

    };
}


export default LikeDisLike;